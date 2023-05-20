const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib")
const dotEnv = require('dotenv');

dotEnv.config()
const APP_SECRET = process.env.APP_SECRET;
const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
const MSG_QUEUE_URL = process.env.MSG_QUEUE_URL;
const MESSAGE_BROKER_URL = process.env.MESSAGE_BROKER_URL;



//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

// Message Broker


// Create a channel
module.exports.CreateChannel = async() => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL)
    const channel = await connection.createChannel()
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
    return channel;
  } catch (error) {
    throw error
  }
}

// publish message
module.exports.PublishMessage = async(channel, binding_key, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message))
  } catch (error) {
    throw error
  }

}

//subscribe messages
module.exports.SubscribeMessage =  async() =>{
  const appQueue = await channel.assertQueue('QUEUE_NAME');

  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
  

  channel.consume(appQueue.queue, data => {
    console.log('received data');
    console.log(data.connect.toString());
    channel.ack(data);
  })
}