import { expect } from 'chai';
import { user as UserModel, IUser } from 'user/user.model';
import { UserService } from 'user/user.service';
import { Types } from 'mongoose';

describe('User Service', () => {
  let userService: UserService;
  const testUser = {
    id: '$2y$10$ja2SB0twIKdLPxEOw2.nGelN4U5YFx8MFarOBdfaY63alg.QfqzJC',
    nickname: 'FunnyBunny', 
  };
  const testUser2 = {
    id: '$2y$10$bboa6cLlMJ/tyt6GeEdY/u9qMstGhgtGJOLI7rkvu6QJfeib8p4Je',
    nickname: 'Cancerify',    
  };

  before(() => {
    userService = new UserService();
  });

  it('Should save valid user', async () => {
    const user = new UserModel(testUser);
    const user2 = new UserModel(testUser2);
    
    const savedUser = await userService.save(user);
    const savedUser2 = await userService.save(user2);
    console.log(savedUser);
    console.log(savedUser2);
    expect(savedUser).to.be.equal(user);
    expect(savedUser2).to.be.equal(user2);
  });

  it('Should not save invalid user', async () => {
    const invalidUser = new UserModel({
      id: testUser.id,
      nickname: 'tester',
    });
    const invalidUser2 = new UserModel({
      id: 'nevermind',
      nickname: testUser.nickname,
    });

    expect(async () => { await userService.save(invalidUser);}).to.throw();
    expect(async () => { await userService.save(invalidUser2);}).to.throw();
  });

  it('Should return all the users', async () => {
    const users = await userService.getByProps({});

    expect(users).to.exist;
  });

  it('Should return one user by id', async () => {
    const userIdApproach: Partial<IUser> = { id: testUser.id };    

    const foundUser = await userService.getOneByProps(userIdApproach);
    expect(foundUser).to.exist;
    if (foundUser) expect(foundUser.nickname).to.equal(testUser.nickname);
  });

  it('Should return one user by nickname', async () => {
    const userNicknameApproach: Partial<IUser> = { nickname: testUser.nickname };    

    const foundUser = await userService.getOneByProps(userNicknameApproach);       
    expect(foundUser).to.exist;
    if (foundUser) expect(foundUser.id).to.equal(testUser.id);    
  });

  it('Should not return any user', async () => {
    const unexistUser: Partial<IUser> = { id: 'Not Exist' };
    const unexistUser2: Partial<IUser> = { nickname: 'unExist' };

    const foundUser = await userService.getOneByProps(unexistUser);
    const foundUser2 = await userService.getOneByProps(unexistUser2);
    expect(foundUser).to.not.exist;
    expect(foundUser2).to.not.exist;
  });

  it('Should delete user by id', async () => {
    const deletedUser = await userService.deleteById(Types.ObjectId(testUser.id));

    expect(deletedUser).to.be.equal(new UserModel(testUser));
  });

  it('Should delete user by nickname', async () => {
    const deletedUser = await userService.deleteById(Types.ObjectId(testUser2.nickname));

    expect(deletedUser).to.be.equal(new UserModel(testUser2));
  });

  it('Should not delete unexisting user', async () => {
    const unexistUser = await userService.deleteById(Types.ObjectId('Unexist'));
    
    expect(unexistUser).to.not.exist;
  });
});

