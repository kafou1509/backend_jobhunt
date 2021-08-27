
// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

//jobseeker roles
exports.roles = (function() {
ac.grant("Jobseeker")
 .readOwn("profile")
 .updateOwn("profile")

//recuiter roles
ac.grant("Recuiter")
 .extend("Jobseeker")
 .readAny("profile")
 
//admin roles
ac.grant("admin")
 .extend("Jobseeker")
 .extend("Recuiter")
 .updateAny("profile")
 .deleteAny("profile")

return ac;
})();
