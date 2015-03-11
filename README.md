# waterline-test-corruption

Proof of concept for https://github.com/balderdashy/waterline/issues/877

## Tested bug

Following create a bug with associations on high frequency execution:

```
Owner.update(1, { pets: [1] }).exec(function(){});
Owner.update(3, { pets: [1] }).exec(function(){});
Owner.update(4, { pets: [1] }).exec(function(){});
```

## Not tested yet

Following create a bug with associations on high frequency execution:

```
Owner.findOne(1).exec(function(err, owner){
  owner.pets.add( 1 );
  owner.save();
});
Owner.findOne(1).exec(function(err, owner){
  owner.pets.add( 2 );
  owner.save();
});
Owner.findOne(1).exec(function(err, owner){
  owner.pets.add( 3 );
  owner.save();
});
```

## What I do

I create a Many-to-Many association with Owner-Pet.

Then create 10 owners and 10 pets.

Pets are associate to Owners with the following rules:
 - Owner with id 1 associate to the pet with id 1, owner 2 with pet 2, 3 with 3, etc.

When all are updated, the join table looks like (it's not constant):
| id | owner | pet |
|----|-------|-----|
|  1 |    10 |  10 |
|  2 |    10 |  10 |
|  3 |    10 |  10 |
|  4 |    10 |  10 |
|  5 |    10 |  10 |

## Run

Change the config of your MySQL server in `config.js`
Or create an user, password and database `waterline-test` on your localhost instance (restrict access to localhost and schema)

Don't forget to install dependencies:
`npm install`

Then run:
`node index.js`