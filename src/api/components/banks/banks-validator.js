const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createBank: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      pin: joi.string().min(6).max(8).required().label('Pin'),
      pin_confirm: joi
        .string()
        .min(6)
        .max(8)
        .required()
        .label('Pin confirmation'),
    },
  },

  updateBank: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  changeBankPin: {
    body: {
      pin_old: joi.string().min(6).max(8).required().label('Old pin'),
      pin_new: joi.string().min(6).max(8).required().label('New pin'),
      pin_confirm: joi
        .string()
        .min(6)
        .max(8)
        .required()
        .label('Pin confirmation'),
    },
  },
};
