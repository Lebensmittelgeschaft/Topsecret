import { expect } from 'chai';
import { message as MessageModel, IMessage } from './message.model';
import { user as UserModel, IUser } from '../user/user.model';
import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { config } from '../config';
import * as mongoose from 'mongoose';

describe('Message Serivce', () => {
  let messageService: MessageService;
  let userService: UserService;

  let testUser: IUser = new UserModel({
    _id: '12345678',
    nickname: 'funnyBunny',
  });
  let testUser2: IUser = new UserModel({
    _id: '24681012',
    nickname: 'Cancerify',
  });
  let testUserMessages = 0;
  let testMessageId = '';
  let testMessageTimestamp = 0;
  let testMessageUserId = '';

  before(async () => {    
    userService = new UserService();
    messageService = new MessageService();
    await UserModel.remove({});
    await MessageModel.remove({});

    testUser = await userService.save(testUser) as IUser;
    testUser2 = await userService.save(testUser2) as IUser;
  });

  after(async () => {
    await UserModel.remove({});
    await MessageModel.remove({});    
  });

  it('Should save valid message', async () => {
    const message = new MessageModel({
      sender: testUser._id,
      receiver: testUser2._id,
      messageText: 'Hello world',
    });
    const message2 = new MessageModel({
      sender: testUser._id,
      receiver: testUser2._id,
      messageText: 'Hey its me again',
    });

    const savedMessage = await messageService.save(message);
    const savedMessage2 = await messageService.save(message2);

    expect(savedMessage).to.exist;
    expect(savedMessage2).to.exist;
    if (savedMessage) {
      expect(savedMessage.messageText).to.equal(message.messageText);
      testMessageId = savedMessage._id;
      testMessageTimestamp = savedMessage.timestamp;
      testMessageUserId = savedMessage.sender;
    }
    if (savedMessage2) expect(savedMessage2.messageText).to.equal(message2.messageText);
    testUserMessages += 2;
  });

  it('Should not save invalid message', () => {
    const invalidMessage = new MessageModel({
      sender: testUser._id,
    });
    const invalidMessage2 = new MessageModel({
      messageText: 'Hey I will not saved',
    });
    
    expect(messageService.save(invalidMessage)).to.be.rejectedWith(mongoose.ValidationError);
    expect(messageService.save(invalidMessage2)).to.be.rejectedWith(mongoose.ValidationError);    
  });

  it('Should return all messages', async () => {
    expect(await messageService.getByProps({})).to.exist;
  });

  it('Should return messages by sender', async () => {
    const messages = await messageService.getByProps({ sender: testUser._id });

    expect(messages).to.exist;
    if (messages) expect(messages).to.have.length(testUserMessages);
  });

  it('Should return messages by receiver', async () => {
    const messages = await messageService.getByProps({ receiver: testUser2._id });

    expect(messages).to.exist;
    if (messages) expect(messages).to.have.length(testUserMessages);
  });

  it('Should return message by id', async () => {
    const message = await messageService.getOneByProps({ _id: testMessageId });

    expect(message).to.exist;
    if (message) expect(message.timestamp).to.equal(testMessageTimestamp);
  });

  it('Should not return message by unexisting properties', async () => {
    expect(messageService.getByProps({ _id: 'unexist' })).to.be.rejectedWith(mongoose.CastError);    
    expect(messageService.getByProps({ sender: 'jeowq' })).to.eventually.be.an('array').that.is.empty;
    expect(messageService.getOneByProps({ _id: 'eunwieq' })).to.be.rejectedWith(mongoose.CastError);
    expect(messageService.getOneByProps({ receiver: 'eunwieq' })).to.eventually.not.exist;
  });

  it('Should update existing message', async () => {
    const textMessage = 'Text Changed';
    const message = await messageService.update({ _id: testMessageId, messageText: textMessage });

    expect(message).to.exist;
    if (message) expect(message.messageText).to.equal(textMessage);
  });

  it('Should not update unexisting message', () => {
    expect(messageService.update({ _id: 'reqwqo', messageText: 'nevermind' })).to.be.rejectedWith(mongoose.CastError);
  });

  it('Should delete existing message', async () => {
    const deletedMessage = await messageService.deleteById(testMessageId);

    expect(deletedMessage).to.exist;
    if (deletedMessage) expect(deletedMessage.timestamp).to.equal(testMessageTimestamp);
  });

  it('Should not delete existing message by sender', () => {
    expect(messageService.deleteById(testMessageUserId)).to.be.rejectedWith(mongoose.CastError);
  });

  it('Should not delete unexisting message', () => {
    expect(messageService.deleteById('eqweowko')).to.be.rejectedWith(mongoose.CastError);
  });
});
