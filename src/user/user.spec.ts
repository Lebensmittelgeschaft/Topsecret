import { expect } from 'chai';
import { user as UserModel, IUser } from './user.model';
import { UserService } from './user.service';
import { config } from '../config';
import * as mongoose from 'mongoose';

describe('User Service', () => {
  let userService: UserService;
  const testUserHash = 'a206adbf33733c456d041100275d2d7559a8096018e761e6ff552a5c177e3040';
  const testUser2Hash = '8e1dd83fa5cd522177a1467fb057b489c8507fe2a42f53dd0c1e1452233b133a';

  let testUser = new UserModel({
    _id: '12345678',
    nickname: 'FunnyBunny',
  });
  let testUser2 = new UserModel({
    _id: '24681012',
    nickname: 'Cancerify',
  });
  
  before(async () => {
    userService = new UserService();
    await UserModel.remove({});

    testUser = await testUser.save();
    testUser2 = await testUser2.save();  
  });

  after(async () => {
    await UserModel.remove({});
  });

  it('Should save valid user', () => {
    const user = new UserModel({ _id: '11111111', nickname: 'shaked' });
    const user2 = new UserModel({ _id: '22222222', nickname: 'sssss' });

    return Promise.all([
      expect(userService.save(user)).to.eventually.exist,
      expect(userService.save(user2)).to.eventually.exist,
    ]);
  });

  it('Should not save invalid user', () => {
    const invalidUser = new UserModel({
      _id: testUserHash,
      nickname: 'tester',
    });
    const invalidUser2 = new UserModel({
      _id: 'nevermind',
      nickname: testUser.nickname,
    });

    return Promise.all([
      expect(userService.save(invalidUser)).to.be.rejectedWith(mongoose.ValidationError),
      expect(userService.save(invalidUser2)).to.be.rejectedWith(mongoose.ValidationError),
    ]);
  });

  it('Should return all the users', () => {
    return expect(userService.getByProps({})).to.eventually.exist;
  });

  it('Should return one user by id', () => {
    return expect(userService.getOneByProps({ _id: testUserHash }))
      .to.eventually.exist
      .and.have.property('nickname', testUser.nickname);
  });

  it('Should return one user by nickname', () => {
    return expect(userService.getOneByProps({ nickname: testUser2.nickname }))
      .to.eventually.exist
      .and.have.property('_id', testUser2Hash);
  });

  it('Should not return any user', () => {
    return Promise.all([
      expect(userService.getByProps({ _id: 'ewqeewq' })).to.eventually.be.an('array').that.is.empty,
      expect(userService.getByProps({ nickname: 'eq' })).to.eventually.be.an('array').that.is.empty,
      expect(userService.getOneByProps({ _id: 'Not Exist' })).to.eventually.not.exist,
      expect(userService.getOneByProps({ nickname: 'unExist' })).to.eventually.not.exist,
    ]);
  });

  it('Should update existing user', () => {
    return expect(userService.update({ _id: testUserHash, nickname: 'newNickname' }))
      .to.eventually.exist
      .and.have.property('nickname', 'newNickname');
  });

  it('Should not update unexisting user', () => {
    return expect(userService.update({ _id: 'unexist', nickname: 'nevermind' }))
      .to.eventually.not.exist;
  });

  it('Should delete user by id', () => {
    return expect(userService.deleteById(testUserHash)).to.eventually.exist
      .and.have.property('_id', testUserHash);
  });

  it('Should not delete user by nickname', () => {
    return expect(userService.deleteById(testUser2.nickname)).to.eventually.not.exist;
  });

  it('Should not delete unexisting user', () => {
    return expect(userService.deleteById('Unexist')).to.eventually.not.exist;
  });
});
