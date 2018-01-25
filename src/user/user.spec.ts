import { expect } from 'chai';
import { user as UserModel, IUser } from './user.model';
import { UserService } from './user.service';
import { config } from '../config';
import { MongoError } from 'mongodb';
import * as mongoose from 'mongoose';

describe('User Service', () => {
  let userService: UserService;
  const testUserHash = '2d33ac149ccf8311efa4060dccb36eddbd5e38c066a180a2bd66f4563cf31784f38651031cd720b4b2f448316998a750f40dbc92821f9b2737e2a8d445ad8956';
  const testUser2Hash = '33659bc05db5e7635bf944ce76382db35a258c19b3c765b9cd7e86781cb5ae378b4bcbbccefc6bcc93d58da0d7a605198bef366e0999461867394545269592d7';
  const testUser = {
    _id: '12345678',
    nickname: 'FunnyBunny',
  };
  const testUser2 = {
    _id: '24681012',
    nickname: 'Cancerify',
  };

  before(async () => {    
    userService = new UserService();
    await UserModel.remove({});
  });

  after(async () => {
    await UserModel.remove({});    
  });

  it('Should save valid user', () => {
    const user = new UserModel(testUser);
    const user2 = new UserModel(testUser2);

    expect(userService.save(user)).to.eventually.exist;
    expect(userService.save(user2)).to.eventually.exist;
  });

  it('Should not save invalid user', () => {
    const invalidUser = new UserModel({
      _id: testUser._id,
      nickname: 'tester',
    });
    const invalidUser2 = new UserModel({
      _id: 'nevermind',
      nickname: testUser.nickname,
    });

    expect(userService.save(invalidUser)).to.be.rejectedWith(MongoError);
    expect(userService.save(invalidUser2)).to.be.rejectedWith(mongoose.ValidationError);
  });

  it('Should return all the users', () => {
    expect(userService.getByProps({})).to.eventually.exist;
  });

  it('Should return one user by id', () => {   
    expect(userService.getOneByProps({ _id: testUserHash })).to.eventually.exist.and.have.property('nickname', testUser.nickname);    
  });

  it('Should return one user by nickname', () => {
    expect(userService.getOneByProps({ nickname: testUser2.nickname })).to.eventually.exist.and.have.property('_id', testUser2Hash);    
  });

  it('Should not return any user',  () => {
    expect(userService.getByProps({ _id: 'ewqeewq'})).to.eventually.be.an('array').that.is.empty;
    expect(userService.getByProps({ nickname: 'ewioeq'})).to.eventually.be.an('array').that.is.empty;
    expect(userService.getOneByProps({ _id: 'Not Exist' })).to.eventually.not.exist;
    expect(userService.getOneByProps({ nickname: 'unExist' })).to.eventually.not.exist;
  });

  it('Should update existing user', () => {    
    expect(userService.update({ _id: testUserHash, nickname: 'newNickname' })).to.eventually.exist.and.have.property('nickname', 'newNickname');    
  });

  it('Should not update unexisting user', () => {
    expect(userService.update({ _id: 'unexist', nickname: 'nevermind' })).to.eventually.not.exist;
  });

  it('Should delete user by id', () => {
    expect(userService.deleteById(testUserHash)).to.eventually.exist.and.have.property('_id', testUserHash);    
  });

  it('Should not delete user by nickname', () => {
    expect(userService.deleteById(testUser2.nickname)).to.eventually.not.exist;
  });

  it('Should not delete unexisting user', () => {
    expect(userService.deleteById('Unexist')).to.eventually.not.exist;    
  });
});
