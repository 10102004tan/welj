import { BadRequestException, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { Role } from "./schemas/role.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Resource } from "./schemas/resource.schema";

@Injectable()
export class RbacService {

    constructor(
        @InjectModel(Role.name) private readonly roleModel: Model<Role>,
        @InjectModel(Resource.name) private readonly resourceModel: Model<Resource>,
    ) { }
    // new role
    async createRole(payload: any) {
        const { name, slug, description, status = "active", grants = [] } = payload;

        // find role by slug
        const existingRole = await this.roleModel.findOne({ slug });
        if (existingRole) {
            throw new BadRequestException('Role with this slug already exists');
        }

        // create new role
        const role = new this.roleModel({
            name,
            slug,
            description,
            status,
            grants
        });

        return await role.save();
    }

    async getRoleBySlug(slug: string) {
        const role = await this.roleModel.findOne({ slug });
        if (!role) {
            throw new BadRequestException('Role not found');
        }
        return role;
    }

    // get all roles
    /**
    [
        {
        resource:"user",
        actions:"create:own",
        attributes:"*,!user_status"
    },
    {
        resource:"user",
        actions:"create:any",
        attributes:"*"
    }
    ] 
     */
    async getAllRoles() {
        const roles = await this.roleModel.aggregate([
            {
                $unwind: "$grants"
            },
            {
                $lookup: {
                    from: "resources",
                    localField: "grants.resource",
                    foreignField: "_id",
                    as: "resource"
                }
            }, {
                $project: {
                    _id: 0,
                    role: '$name',
                    resource: '$resource.name',
                    action: '$grants.actions',
                    attributes: '$grants.attributes',
                }
            },{
                $unwind: "$resource"
            }
        ])

        return roles;
    }


    // create resource
    async createResource(payload: any) {
        const { name, slug, description } = payload;
        // find resource by slug
        const existingResource = await this.resourceModel.findOne({ slug });
        if (existingResource) {
            throw new BadRequestException('Resource with this slug already exists');
        }

        // create new resource
        const resource = new this.resourceModel({
            name,
            slug,
            description,
        });

        return await resource.save();
    }


    // get all resources
    async getAllResources() {
        const resources = await this.resourceModel.find({}).select("-__v").lean();
        if (!resources) {
            throw new BadRequestException('Resources not found');
        }
        return resources;
    }
}