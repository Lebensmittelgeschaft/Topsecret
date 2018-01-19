import { expect } from 'chai';
import { user as UserModel, IUser, generateHash } from './user.model';
import { UserService } from './user.service';
import { config } from '../config';
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
    
    // console.log(user);
    // console.log(user2);

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
    
    console.log(await userService.save(invalidUser) + ' IN TEST');
    console.log(await userService.save(invalidUser2) + ' IN TEST');

    expect(await userService.save(invalidUser)).to.not.exist;
    expect(await userService.save(invalidUser2)).to.not.exist;
  });

  it('Should return all the users', async () => {
    const users = await userService.getByProps({});

    expect(users).to.exist;
  });

  it('Should return one user by id', async () => {
    const userIdApproach: Partial<IUser> = { _id: testUserHash };    

    const foundUser = await userService.getOneByProps(userIdApproach);
    expect(foundUser).to.exist;
    if (foundUser) expect(foundUser.nickname).to.equal(testUser.nickname);
  });

  it('Should return one user by nickname', async () => {
    const userNicknameApproach: Partial<IUser> = { nickname: testUser2.nickname };    

    const foundUser = await userService.getOneByProps(userNicknameApproach);       
    expect(foundUser).to.exist;
    if (foundUser) expect(foundUser._id).to.equal(testUser2Hash);    
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
    const deletedUser = await userService.deleteById(await generateHash(testUser._id));
    
    expect(deletedUser).to.exist;
    if (deletedUser) expect(deletedUser._id).to.be.equal(testUser._id);
  });

  it('Should delete user by nickname', async () => {
    const deletedUser = await userService.deleteById(testUser2.nickname);
    
    expect(deletedUser).to.exist;
    if (deletedUser) expect(deletedUser._id).to.be.equal(testUser2._id);
  });

  it('Should not delete unexisting user', async () => {
    const unexistUser = await userService.deleteById(await generateHash('Unexist'));
    
    expect(unexistUser).to.not.exist;
  });
});

