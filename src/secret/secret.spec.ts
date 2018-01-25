import { expect } from 'chai';
import { secret as SecretModel, ISecret } from './secret.model';
import { user as UserModel, IUser } from '../user/user.model';
import { SecretService } from './secret.service';
import { UserService } from '../user/user.service';
import { config } from '../config';
import * as mongoose from 'mongoose';

describe('Secret Service', () => {
  let secretService: SecretService;
  let userService: UserService;

  let testUser: IUser = new UserModel({
    _id: '12345678',
    nickname: 'funnyBunny',
  });
  let testUser2: IUser = new UserModel({
    _id: '24681012',
    nickname: 'Cancerify',
  });
  let testUserSecrets = 0;
  let testSecretId = '0';
  let testSecretUserId = '';

  before(async () => {
    userService = new UserService();
    secretService = new SecretService();
    await UserModel.remove({});
    await SecretModel.remove({});

    testUser = await userService.save(testUser) as IUser;
    testUser2 = await userService.save(testUser2) as IUser;
  });

  after(async () => {
    await UserModel.remove({});
    await SecretModel.remove({});    
  });

  it('Should save valid secret', async () => {
    const secret = new SecretModel({
      publisher: testUser._id,
      secretText: 'Hello world! this is my secret',
    });
    const secret2 = new SecretModel({
      publisher: testUser2._id,
      secretText: 'lol',
    });

    const savedSecret = await secretService.save(secret);
    const savedSecret2 = await secretService.save(secret2);
    testUserSecrets += 1;
    expect(savedSecret).to.exist;
    expect(savedSecret2).to.exist;
    if (savedSecret) expect(savedSecret.publisher).to.equal(testUser._id);
    if (savedSecret2) {
      expect(savedSecret2.publisher).to.equal(testUser2._id);
      testSecretId = savedSecret2._id;
      testSecretUserId = savedSecret2.publisher;
    }
  });

  it('Should save secret with default values', async () => {
    const preDefinedSecret = new SecretModel({
      publisher: testUser._id,
      secretText: 'This will have default values',
      comments: [{ postBy: testUser2._id, comment: 'Will Not Exist', timestamp: 123456 }],
      likes: 99999,
      dislikes: 1,
      timestamp: 0,
    });

    const savedSecret = await secretService.save(preDefinedSecret);
    testUserSecrets += 1;

    expect(savedSecret).to.exist;
    if (savedSecret) {
      expect(savedSecret.comments).to.be.empty;
      expect(savedSecret.likes).to.equal(0);
      expect(savedSecret.dislikes).to.equal(0);
      expect(savedSecret.timestamp).to.be.above(0);
    }
  });

  it('Should not save invalid secret', () => {
    const invalidSecret = new SecretModel({
      publisher: 'notexist',
      secretText: 'This will not saved',
    });

    const invalidSecret2 = new SecretModel({
      secretText: 'hehehehe',
    });

    expect(secretService.save(invalidSecret)).to.be.rejectedWith(mongoose.ValidationError);    
    expect(secretService.save(invalidSecret2)).to.be.rejectedWith(mongoose.ValidationError);   
  });

  it('Should return all secrets', async () => {
    const secrets = await secretService.getByProps({});

    expect(secrets).to.exist;
  });

  it('Should return existing secrets by publisher', async () => {
    const secrets = await secretService.getByProps({ publisher: testUser._id });

    expect(secrets).to.exist;
    expect(secrets).to.have.length(testUserSecrets);
  });

  it('Should return existing secret\'s publisher (IUser) object', async () => {
    const secret = await secretService.getOneByProps({ publisher: testUser2._id });

    expect(secret).to.exist;
    if (secret) {
      const populatedSecret = await secret.populate('publisher').execPopulate();
      expect((populatedSecret.publisher as any).nickname).to.equal(testUser2.nickname);
    }
  });

  it('Should not return any secret', () => {
    expect(secretService.getByProps({ _id: 'unexist' })).to.be.rejectedWith(mongoose.CastError);
    expect(secretService.getByProps({ publisher: 'unexist' })).to.eventually.be.an('array').that.is.empty;
    expect(secretService.getOneByProps({ secretText: 'wmeqoemwo' })).to.eventually.not.exist;
    expect(secretService.getOneByProps({ publisher: 'ewqewqeqw' })).to.eventually.not.exist;
  });

  it('Should update existing secret', async () => {
    const secretTextUpdate = 'Hey this is updated!';
    const updatedSecret = await secretService.update({
      _id: testSecretId,
      secretText: secretTextUpdate,
      comments: [{ postBy: testUser._id, comment: 'The update worked!' }],
    });

    expect(updatedSecret).to.exist;
    if (updatedSecret) {
      expect(updatedSecret.secretText).to.equal(secretTextUpdate);
      expect(updatedSecret.comments[0].postBy).to.equal(testUser._id);
    }
  });

  it('Should not update unexistng secret', () => {
    expect(secretService.update({ _id: 'unexist', secretText: 'nevermind' })).to.be.rejectedWith(mongoose.CastError);
  });

  it('Should delete existing secret by id', async () => {
    const deletedSecret = await secretService.deleteById(testSecretId);

    expect(deletedSecret).to.exist;
    if (deletedSecret) expect(deletedSecret.publisher).to.equal(testSecretUserId);
  });

  it('Should not delete existing secret by publisher', () => {
    expect(secretService.deleteById(testSecretUserId)).to.be.rejectedWith(mongoose.CastError);
  });

  it('Should not delete unexisting secret', () => {
    expect(secretService.deleteById('unexist')).to.be.rejectedWith(mongoose.CastError);
  });
}); 
