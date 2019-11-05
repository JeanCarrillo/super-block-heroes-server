
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRelation } from './friends-entity';

@Injectable()
export class FriendsService {

    constructor(@InjectRepository(FriendRelation) private FriendsRepository: Repository<FriendRelation>) { }

    async getFriends(FriendRelation: FriendRelation): Promise<FriendRelation[]> {
        return await this.FriendsRepository.find();
    }

    async getFriendRelation(_id: number): Promise<FriendRelation[]> {
        return await this.FriendsRepository.find({
            select: ["user_id_1"],
            where: [{ "id": _id }]
        });
    }

    async createFriendRelation(FriendRelation:FriendRelation) {
        this.FriendsRepository.create(FriendRelation);
    }

    async updateFriendRelation(FriendRelation: FriendRelation) {
        this.FriendsRepository.save(FriendRelation)
    }

    async deleteFriendRelation(FriendRelation: FriendRelation) {
        this.FriendsRepository.delete(FriendRelation);
    }
}