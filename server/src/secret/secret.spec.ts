import { expect } from 'chai';
import { secret as SecretModel, ISecret } from './secret.model';
import { user as UserModel, IUser } from '../user/user.model';
import { SecretService } from './secret.service';
import { config } from '../config';
import * as mongoose from 'mongoose';

describe('Secret Service', () => {
  let secretService: SecretService; 

  let testUser: IUser;
  let testUser2: IUser;
  let testSecret: ISecret;
  let testSecret2: ISecret;

  before(async () => {    
    secretService = new SecretService();
    await UserModel.remove({});
    await SecretModel.remove({});
    
    testUser = await new UserModel({
      _id: '12345678',
      nickname: 'funnyBunny',
    }).save();
    testUser2 = await new UserModel({
      _id: '24681012',
      nickname: 'Cancerify',
    }).save();

    testSecret = await new SecretModel({
      publisher: testUser._id,
      text: 'Publish secret',
    }).save();
    testSecret2 = await new SecretModel({
      publisher: testUser2._id,
      text: 'Second publish secret',
    }).save();    
  });

  after(async () => {
    await UserModel.remove({});
    await SecretModel.remove({});    
  });

  it('Should save valid secret', () => {
    const secret = new SecretModel({
      publisher: testUser._id,
      text: 'Hello world! this is my secret',
    });
    const secret2 = new SecretModel({
      publisher: testUser2._id,
      text: 'lol',
    });

    return Promise.all([
      expect(secretService.save(secret)).to.eventually.exist
                                        .and.have.property('publisher', testUser._id),
      expect(secretService.save(secret2)).to.eventually.exist
                                         .and.have.property('publisher', testUser2._id),
    ]);    
  });

  it('Should save secret with default values', () => {
    const preDefinedSecret = new SecretModel({
      publisher: testUser._id,
      text: 'This will have default values',
      comments: [{ postBy: testUser2._id, text: 'Will Not Exist', timestamp: 123456 }],
      likes: 99999,
      dislikes: 1,
      timestamp: 0,
    });
    const savedSecret = secretService.save(preDefinedSecret);
    return Promise.all([
      expect(savedSecret).to.eventually.exist,
      expect(savedSecret).to.eventually.have.property('likes', 0),
      expect(savedSecret).to.eventually.have.property('dislikes', 0),
      expect(savedSecret).to.eventually.have.property('timestamp').above(0),
      expect(savedSecret).to.eventually.have.property('comments').that.is.an('array').that.is.empty,
    ]);   
  });

  it('Should not save invalid secret', () => {
    const invalidSecret = new SecretModel({
      publisher: 'notexist',
      text: 'This will not saved',
    });

    const invalidSecret2 = new SecretModel({
      text: 'hehehehe',
    });

    return Promise.all([
      expect(secretService.save(invalidSecret)).to.be.rejectedWith(mongoose.ValidationError),
      expect(secretService.save(invalidSecret2)).to.be.rejectedWith(mongoose.ValidationError),
    ]);   
  });

  it('Should return all secrets', () => {
    return expect(secretService.getByProps({})).to.eventually.exist;   
  });

  it('Should return existing secrets by publisher', () => {
    return expect(secretService.getByProps({ publisher: testUser._id })).to.eventually.exist;    
  });

  it('Should return existing secret\'s publisher (IUser) object', () => {
    const secretPopulate = secretService.getOneByProps({ publisher: testUser2._id })
                                        .populate('publisher');
    
    return expect(secretPopulate).to.eventually.exist
                                 .and.have.property('publisher')
                                 .that.have.property('nickname', testUser2.nickname);
  });

  it('Should not return any secret', () => {
    return Promise.all([
      expect(secretService.getByProps({ _id: 'unexist' })).to.be.rejectedWith(mongoose.CastError),
      expect(secretService.getByProps({ publisher: 'unexist' })).to.eventually.be.an('array')
                                                                .that.is.empty,
      expect(secretService.getOneByProps({ text: 'wmeqoemwo' })).to.eventually.not.exist,
      expect(secretService.getOneByProps({ publisher: 'ewqewqeqw' })).to.eventually.not.exist,
    ]);
  });

  it('Should update existing secret', () => {
    const secretTextUpdate = 'Hey this is updated!';
    const comment = { postBy: testUser._id, text: 'The update worked!' };
    const updatedSecret = secretService.update({
      _id: testSecret._id,
      text: secretTextUpdate,
      comments: [comment],
    });

    return Promise.all([
      expect(updatedSecret).to.eventually.exist,
      expect(updatedSecret).to.eventually.have.property('text', secretTextUpdate),
      expect(updatedSecret).to.eventually
                           .have.nested.property('comments[0].postBy', comment.postBy),
                           
    ]);
  });

  it('Should not update unexistng secret', () => {
    return expect(secretService.update({ _id: 'exist', text: 'never' }))
                                       .to.be.rejectedWith(mongoose.CastError);
  });

  it('Should delete existing secret by id',  () => {
    return expect(secretService.deleteById(testSecret2._id))
                  .to.eventually.exist.and.have.property('publisher', testSecret2.publisher);
  });

  it('Should not delete existing secret by publisher', () => {
    return expect(secretService.deleteById(testSecret.publisher))
                  .to.be.rejectedWith(mongoose.CastError);
  });

  it('Should not delete unexisting secret', () => {
    return expect(secretService.deleteById('unexist')).to.be.rejectedWith(mongoose.CastError);
  });
}); 
