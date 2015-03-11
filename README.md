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

## Run

Change the config of your MySQL server in `config.js`
Or create an user, password and database `waterline-test` on your localhost instance (restrict access to localhost and schema)

Don't forget to install dependencies:
`npm install`

Then run:
`node index.js`