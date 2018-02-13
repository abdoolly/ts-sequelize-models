
# Ts-sequelize-models
This package is made to help you initialize sequelize models very easily not only that but , also it will help you make a very neat and good looking sequelize models using typescript.

[![npm version](https://badge.fury.io/js/ts-sequelize-models.svg)](https://badge.fury.io/js/ts-sequelize-models)
[![Dependency Status](https://david-dm.org/abdoolly/ts-sequelize-models.svg)](https://david-dm.org/abdoolly/ts-sequelize-models.svg)

## Table of contents
- [Prerequisite packages](#prerequisite)
- [Installation](#installation)
- [How to make your sequelize models](#how-to-make-your-sequelize-models)
	- [Basic usage](#basic-usage)
	- [Associations](#associations)
	- [Hooks](#hooks)
	- [Option paramters in sequelize define](#option-paramters-in-sequelize-define)
	- [All available functions and properties to override](#all-available-functions-and-properties-to-override)
- [How to initialization your models](#how-to-initialization-your-models)
	-	[sequelizeInit method details](#sequelizeinit-method-details)
	-	[sequelizeInit option paramter details](#sequelizeinit-option-paramter-details)
- [Feedback](#feedback)
- [Planned features](#planned-features)

## Prerequisite
- Before installing you will need to install of course sequelize using 
`npm i sequelize`
- you will also need to install sequelize type declarations using this command
`npm i @types/sequelize`

## Installation

- Now to install this package just type

    `npm i ts-sequelize-models`

# How to make your sequelize models

## basic usage

- first you need to make a class and extend the base class sequelizeModel like that.

```import { sequelizeModel } from 'ts-sequelize-models';
import { DefineAttributes, DataTypes } from 'sequelize';

export class User extends sequelizeModel {

    getAttributes(DataTypes: DataTypes): DefineAttributes {
        return {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING,
        };
    }

}
```
The above code does exactly what this sequelize code does
``` 
sequelize.define('User', {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING,
        }
    });
```
- The class name will be your name of the model if you wanted different you can always override the `modelName` property.
- when you class extend the sequelizeModel it will ask you to implement the `getAttribute()` function which will be the attributes that will be used to create your table.

## Associations

**This was the basic usage but , how to make associations with that model**

- you just need to override the associate() method and inside it define your associations like that.
```
	associate(models: any, currentModel: Model<any, any>): any {
		models.Role.hasMany(currentModel, { constraints: false, allowNull: true, defaultValue: null });
		// you can do as many associations as you want here
    }
```
- now after that your have finished the associations

## Hooks

**Now How to add sequelize Hooks** 

- just as easy as overriding a function and return a callback from it like that
```
beforeCreate() {
        return hashPassword(user.password).then(hashedPw => {
            user.password = hashedPw;
        });
 }
```
The above function will exactly do when you do that code using the normal sequelize models
```
User.beforeCreate((user: any, options: any) => {
return hashPassword(user.password).then(hashedPw => {
            user.password = hashedPw;
        });
 });
```
- now it looks much more neater

**Hint :** you now don't need to go to the sequelize docs to know what hook functions are available. All hooks are just available when you press your auto complete keys cause this the beauty of typescript.

## All available functions and properties to override

### modelName
This is a property in which if you wanted the model name to be with a certain name different than your class name just override it and set its value to what you want.

### getAttributes()
This method is used to return the attributes of your table which will be used during the model definition
**This is the only required method in the class**

|  paramter              |Type                          |Description                         
|----------------|-------------------------------|-----------------------------|
|DataTypes|   sequelize.DataTypes | object that holds the sequelize datatypes which is needed in model definition


example:

```
import { sequelizeModel } from 'ts-sequelize-models';
import { DefineAttributes, DataTypes } from 'sequelize';

export class User extends sequelizeModel {
    getAttributes(DataTypes: DataTypes): DefineAttributes {
        return {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING,
        };
    }
}
```

### associate()

This method is used to make you model relation with other tables it does not return anything 

|  paramter              |Type                          |Description                         
|----------------|-------------------------------|-----------------------------|
|models|   Object | This is an object that holds all other initialied models which will make you to associate your model with any other model 
|currentModel|   sequelize.Model<any,any> | This is the sequelize model you are currently in which you will need during the association

example:

```
associate(models: any, currentModel: Model<any, any>): any {
		models.Role.hasMany(currentModel, { constraints: false, allowNull: true, defaultValue: null });
}
```
### getOptions()
This is a method which is used to get the options paramter in the sequlize.define which was the third paramter in that method
it does not get any paramters but , it require you to return an object of 
`DefineOptions<any>` 

**NOTE**
also this function according to sequlize reference you can add hooks in the options when you add hooks here it override any hook in the model if it was with the same name but if it was with a different name they just merge together.

example:

I am just putting the imports I used above each function for you to know the import needed for the types

```
import { DefineOptions } from 'sequelize';
getOptions(): DefineOptions<any> {
        return {
            hooks: {
                beforeValidate: (user, options) => {
                    user.mood = 'happy';
                },
                afterValidate: (user, options) => {
                    user.username = 'Toni';
                }
            }
        };
 }
```


### modelAction()
This method I have put to give you the flexibility to add as many hooks as you want and how you want it or do what ever you wish with model in it.
It's made for any missing thing I did not include also it does not return anything but, it accepts the following

**Paramters description**

|  paramter              |Type                          |Description                         
|----------------|-------------------------------|-----------------------------|
|model|   sequelize.Model<any, any> | object of the model you are currently in right now to use it as you like either to define hooks or any additional things you want to do.

example:
```
modelAction(model: Model<any, any>) {
        model.addHook('afterValidate', 'someCustomName', (user, options) => {
            return sequelize.Promise.reject(new Error("I'm afraid I can't let you do that!"));
        });

        // or do this

        model.afterValidate('myHookAfter', (user, options) => {
            user.username = 'Toni';
        });

        // you can do here what ever you like with the model I just execute the function for you 
    }
```


## These are sequelize hooks functions and which you can override 

you can override them and return from them the closure as documented in sequelize documentation here 
http://docs.sequelizejs.com/manual/tutorial/hooks.html

The sequlize reference explain very well how to use them I will just show you how to override one function and return the closure from it to see how it works then the same concept applies on the rest of all the available hooks.

### beforeValidate()
This hook is called before validation you can override it to be like that:
```
beforeValidate() {
        return (user: any, options: any) => {
            user.username = 'Toni';
        }
 }
```
as you can see all you do is override the function then return the closure you want to happen in the hook the same concept applies on all the hooks
if you wanted to make named hooks then just put them in the modelAction method.

### afterValidate()
### beforeCreate()
### afterCreate()
### beforeDestroy()
### beforeDelete()
### afterDestroy()
### afterDelete()
### beforeUpdate()
### afterUpdate()
### beforeBulkCreate()
### afterBulkCreate()
### beforeBulkDestroy()
### beforeBulkDelete()
### afterBulkDestroy()
### afterBulkDelete()
### beforeBulkUpdate()
### afterBulkUpdate()
### beforeFind()
### beforeFindAfterExpandIncludeAll()
### beforeFindAfterOptions()
### afterFind()



## Option paramters in sequelize define

**Now How to pass the options parameter in the sequelize.define** 

you just need to override the getOptions() method like that and don't forget to make it's return type so typescript would autocomplete to you the attributes you can enter

```
getOptions(): DefineOptions<any>{
  return {
  // your options here
  };
}
```

More Detailed documentation is coming in  a few days which will show all the functions that can be overriden and a full models examples to more illustrate the package.

# How to initialization your models
- First just initalize your sequelize object using your config like that
 ```
 const Sequelize = require('sequelize');
 let sequelize = new Sequelize(config.database, config.username,  config.password, config);
 ```
- I required sequelize like that not with import cause sequelize only export the sequelize interface in it so it will work with you this way.
- In future versions I will make a function event to initialize the sequelize for you but , for now I give you the flexibility of creating it yourself.

 -  Now all is missing is this line of code to initialize all your models 
 ```
 import { sequelizeInit } from 'ts-sequelize-models';
 
 let { sequelize, models } = await sequelizeInit(sequelize, './api/models/',
            {
                exposeGlobal: true
            });
 ```
 - first paramter is your sequelize object you just created
 - second parameter is the path to your **compiled** models
 - third parameter is some options for sync I by default automatically sync for you with force:false
 - this function above will return you two objects 
 
## sequelizeInit method details

|                |Type                          |Description                         
|----------------|-------------------------------|-----------------------------|
|models|   Object | object that contains the models after they have been defined and ready for use object key is the modelName
sequelize |instance of sequelize | This is the sequlize object you passed to me I just used it and return it back to you in case you need it by anyway or another  

## sequelizeInit option paramter details

 **This is a detailed table to show you the options object in sequelizeInit()**
 
| Option                |Type                          |Description                         
|----------------|-------------------------------|-----------------------------|
|exposeGlobal|   Boolean | expose the model names to be accessible globaly like that `User.find()` directly without any imports. 
sync | Boolean | it's an option if you want to sync or not if true the package sync with option force:false
sync | Object | now if you passed an object this will be the same exact options you pass to the normal sequelize sync function which is documented here http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-method-sync if you forgot to pass force:false I will automatically add force:false by default while syncing

## Feedback

- I hope my package helps you by a way for another  if you have some feedback please email me on abdoolly@gmail.com 
- If you have found any issues please create an issue in the package repository https://github.com/abdoolly/ts-sequelize-models/issues
- If you some ideas or features you want me to add which could help you please email me on the above email.

## Planned features

- Make the sequelize initialization inside the library so you just need to pass the configs.
- I will make a command line to declare your models in global.d.ts declarations which will help you use the models globaly.
