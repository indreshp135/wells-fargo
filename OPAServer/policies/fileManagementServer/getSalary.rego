package global.fileManagementServer.getSalary

import data.users

default allow := false

allowed {
	name := input.name
	data.users[name].role == "manager"
}
