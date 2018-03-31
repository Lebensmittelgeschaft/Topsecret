import { expect } from 'chai';
import { message as MessageModel, IMessage } from './message.model';
import { user as UserModel, IUser } from '../user/user.model';
import { MessageService } from './message.service';
import { config } from '../config';
import * as mongoose from 'mongoose';

describe('Message Serivce', () => {
  let messageService: MessageService;

  let testUser: IUser;
  let testUser2: IUser;

  let testMessage : IMessage;
  let testMessage2 : IMessage;

  before(async () => {    
    messageService = new MessageService();
    await UserModel.remove({});
    await MessageModel.remove({});

    testUser = await new UserModel({
      _id: '12345678',
      nickname: 'funnyBunny',
    }).save();
    testUser2 = await new UserModel({
      _id: '24681012',
      nickname: 'Cancerify',
    }).save();

    testMessage = await new MessageModel({
      sender: testUser._id,
      receiver: testUser2._id,
      text: 'Whatsup',
    }).save();
    testMessage2 = await new MessageModel({
      sender: testUser2._id,
      receiver: testUser._id,
      text: 'Fine wat bout u',
    }).save();
  });

  after(async () => {
    await UserModel.remove({});
    await MessageModel.remove({});    
  });

  it('Should save valid message', () => {
    const message = new MessageModel({
      sender: testUser._id,
      receiver: testUser2._id,
      text: 'Hello world',
    });
    const message2 = new MessageModel({
      sender: testUser._id,
      receiver: testUser2._id,
      text: 'Hey its me again',
    });

    return Promise.all([
      expect(messageService.save(message)).to.eventually.exist
                                          .and.have.property('text', message.text),
      expect(messageService.save(message2)).to.eventually.exist
                                           .and.have.property('text', message2.text),

    ]);    
  });

  it('Should not save invalid message', () => {
    const invalidMessage = new MessageModel({
      sender: testUser._id,
    });
    const invalidMessage2 = new MessageModel({
      text: 'Hey I will not saved',
    });
    
    return Promise.all([
      expect(messageService.save(invalidMessage)).to.be.rejectedWith(mongoose.ValidationError),
      expect(messageService.save(invalidMessage2)).to.be.rejectedWith(mongoose.ValidationError),
    ]);   
  });

  it('Should return all messages', () => {
    return expect(messageService.getByProps({})).to.eventually.exist;
  });

  it('Should return messages by sender', () => {
    return expect(messageService.getByProps({ sender: testUser._id })).to.eventually.exist;    
  });

  it('Should return messages by receiver', () => {
    return expect(messageService.getByProps({ receiver: testUser2._id })).to.eventually.exist;
  });

  it('Should return message by id', () => {
    return expect(messageService.getOneByProps({ _id: testMessage._id })).to.eventually.exist;
  });

  it('Should not return message by unexisting properties', async () => {
    return Promise.all([
      expect(messageService.getByProps({ _id: 'exist' })).to.be.rejectedWith(mongoose.CastError),
      expect(messageService.getByProps({ sender: 'jeowq' })).to.eventually.be.an('array')
                                                            .that.is.empty,
      expect(messageService.getOneByProps({ _id: 'euieq' })).to.be.rejectedWith(mongoose.CastError),
      expect(messageService.getOneByProps({ receiver: 'eunwieq' })).to.eventually.not.exist,
    ]);
  });

  it('Should update existing message', () => {
    const textMessage = 'Text Changed';
    return expect(messageService.update({ _id: testMessage2._id, text: textMessage }))
                  .to.eventually.exist.and.have.property('text', textMessage);
  });

  it('Should not update unexisting message', () => {
    return expect(messageService.update({ _id: 'reqwqo', text: 'nevermind' }))
                  .to.be.rejectedWith(mongoose.CastError);
  });

  it('Should delete existing message', () => {
    return expect(messageService.deleteById(testMessage._id))
                  .to.eventually.exist.and.have.property('timestamp', testMessage.timestamp);
  });

  it('Should not delete existing message by sender', () => {
    return expect(messageService.deleteById(testMessage.sender))
                  .to.be.rejectedWith(mongoose.CastError);
  });

  it('Should not delete unexisting message', () => {
    return expect(messageService.deleteById('eqweowko'))
                  .to.be.rejectedWith(mongoose.CastError);
  });
});
