import { expect } from 'chai';
import { user as UserModel, IUser } from './user.model';
import { UserService } from './user.service';
import { config } from '../config';
import * as mongoose from 'mongoose';


describe('User Service', () => {
  let userService: UserService;
  const testUser = {
    _id: '$2y$10$ja2SB0twIKdLPxEOw2.nGelN4U5YFx8MFarOBdfaY63alg.QfqzJC',
    nickname: 'FunnyBunny', 
  };
  const testUser2 = {
    _id: '$2y$10$bboa6cLlMJ/tyt6GeEdY/u9qMstGhgtGJOLI7rkvu6QJfeib8p4Je',
    nickname: 'Cancerify',    
  };  
  
  before(async () => {
    (<any>mongoose).Promise = global.Promise;
    
    await mongoose.connect(config.MONGOURI, { useMongoClient: true } ,(err) => {
      if (err) {
        console.error(err);
        process.exit();
      }
      console.log('MongoDB Connection Established');
    });    
    userService = new UserService();
    await UserModel.remove({});
  });

  after(async () => {    
    await mongoose.disconnect();
  });

  it('Should save valid user', async () => {
    const user = new UserModel(testUser);
    const user2 = new UserModel(testUser2);
    
    expect(await userService.save(user)).to.exist;
    expect(await userService.save(user2)).to.exist;    
  });

  it('Should not save invalid user', async () => {
    const invalidUser = new UserModel({
      _id: testUser._id,
      nickname: 'tester',
    });
    const invalidUser2 = new UserModel({
      _id: 'nevermind',
      nickname: testUser.nickname,
    });

    expect(await userService.save(invalidUser)).to.not.exist;
    expect(await userService.save(invalidUser2)).to.not.exist;
  });

  it('Should return all the users', async () => {
    const users = await userService.getByProps({});

    expect(users).to.exist;
  });

  it('Should return one user by id', async () => {
    const userIdApproach: Partial<IUser> = { _id: testUser._id };    

    const foundUser = await userService.getOneByProps(userIdApproach);
    expect(foundUser).to.exist;
    if (foundUser) expect(foundUser.nickname).to.equal(testUser.nickname);
  });

  it('Should return one user by nickname', async () => {
    const userNicknameApproach: Partial<IUser> = { nickname: testUser.nickname };    

    const foundUser = await userService.getOneByProps(userNicknameApproach);       
    expect(foundUser).to.exist;
    if (foundUser) expect(foundUser._id).to.equal(testUser._id);    
  });

  it('Should not return any user', async () => {
    const unexistUser: Partial<IUser> = { _id: 'Not Exist' };
    const unexistUser2: Partial<IUser> = { nickname: 'unExist' };

    const foundUser = await userService.getOneByProps(unexistUser);
    const foundUser2 = await userService.getOneByProps(unexistUser2);
    expect(foundUser).to.not.exist;
    expect(foundUser2).to.not.exist;
  });

  it('Should delete user by id', async () => {
    const deletedUser = await userService.deleteById(mongoose.Types.ObjectId(testUser._id));
    
    expect(deletedUser).to.exist;
    if (deletedUser) expect(deletedUser._id).to.be.equal(testUser._id);
  });

  it('Should delete user by nickname', async () => {
    const deletedUser = await userService.deleteById(mongoose.Types.ObjectId(testUser2.nickname));
    
    expect(deletedUser).to.exist;
    if (deletedUser) expect(deletedUser._id).to.be.equal(testUser2._id);
  });

  it('Should not delete unexisting user', async () => {
    const unexistUser = await userService.deleteById(mongoose.Types.ObjectId('Unexist'));
    
    expect(unexistUser).to.not.exist;
  });
});

