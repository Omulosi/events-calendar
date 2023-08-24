db.createUser({
  user: "event",
  pwd: "event12345",
  roles: [
    {
      role: "readWrite",
      db: "events_db",
    },
  ],
});
