import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRelation } from './friends-entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendRelation)
    private FriendsRepository: Repository<FriendRelation>,
  ) {}

  async getFriends(friendRelation: FriendRelation): Promise<FriendRelation[]> {
    return await this.FriendsRepository.find();
  }

  async getFriendRelation(id: number): Promise<FriendRelation[]> {
    return await this.FriendsRepository.find({
      select: ['user_id_1'],
      where: [{ id }],
    });
  }

  async createFriendRelation(friendRelation: FriendRelation) {
    this.FriendsRepository.create(friendRelation);
  }

  async updateFriendRelation(friendRelation: FriendRelation) {
    this.FriendsRepository.save(friendRelation);
  }

  async deleteFriendRelation(friendRelation: FriendRelation) {
    this.FriendsRepository.delete(friendRelation);
  }
}
