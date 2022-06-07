package global.common.util

default employee := false

employee {
	works_here
}

works_here {
	name := input.name
	data.users[name].role == "employee"
}

works_here {
	name := input.name
	data.users[name].role == "manager"
}
