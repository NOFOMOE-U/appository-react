import { Injectable } from '@nestjs/common';
import { Task as TaskType, User, UserRole } from '@prisma/client';
import { UserService } from '../../modules/user/user.service';
@Injectable()
export class PermissionsService {
	constructor(private readonly userService: UserService){}
	//Define permissions constants
	private readonly ADMIN_ROLES: UserRole[] = [
		UserRole.ADMIN,
		UserRole.MANAGER,
		// UserRole.SUPER_ADMIN
	]
	private readonly USER_ROLES = [UserRole.MODERATOR]

	//Define resource types
	readonly TASK = 'task'
	readonly PROJECT = 'project'
	readonly USER = 'user'
	readonly TEAM = 'team'

	//Define permissions matrix
	readonly permissionsMatrix = {
		[UserRole.ADMIN || UserRole.MANAGER
			// || UserRole.SUPER_ADMIN
		]: {
			[this.PROJECT]: {
				create: true,
				read: true,
				update: true,
				delete: true,
				invite: true,
				remove: true,
			},
			[this.TASK]: {
				create: true,
				read: true,
				update: true,
				delete: true,
				reassign: true,
				updateDueDate: true,
			},
			[this.USER]: {
				read: true,
				update: true,
				delete: true,
			},
			[this.TEAM]: {
				read: true,
				update: true,
				delete: true,
			},
		},
		['moderator']: {
			[this.PROJECT]: {
				create: false,
				read: true,
				update: false,
				delete: false,
				invite: true,
				remove: true,
			},
			[this.TASK]: {
				create: false,
				read: true,
				update: false,
				delete: false,
				reassign: true,
				updateDueDate: true,
			},
		},
		['user']: {
			[this.PROJECT]: {
				create: true,
				read: true,
				update: true,
				delete: true,
				invite: true,
				remove: true,
			},
			[this.TASK]: {
				create: true,
				read: true,
				update: true,
				delete: true,
				reassign: true,
				updateDueDate: true,
			},
		},
	}
	//Check if the user has administrative privileges
	isAdmin(user: User): boolean {
		return user && user.roles.some(role => ['ADMIN',
			'MANAGER',
			'SUPER_ADMIN'
		].includes(role));
	}

	isManager(user: User): boolean {
		return user && this.ADMIN_ROLES.includes(UserRole.MANAGER)
	}

	//Check if the user has moderator privileges
	isModerator(user: User): boolean {
		return user && this.USER_ROLES.includes(UserRole.MODERATOR)
	}

	//Check if the user is the creator of the task
	isCreator(user: User, task: TaskType): boolean {
		return user && task && user.id === task.creatorId
	}

	//Check if the user is assigned to the task
	isAssigned(user: User, task: TaskType): boolean {
		return user && task && (task.assigneeId as string).includes(user.id)
	}

	//Check if the user has permission to view the task
	canViewTask(user: User, task: TaskType): boolean {
		return user && (this.isAdmin(user) || this.isCreator(user, task) || this.isAssigned(user, task))
	}

	//Check if the user has permission to update the task
	canUpdateTask(user: User, task: TaskType): boolean {
		return user && (this.isAdmin(user) || this.isCreator(user, task))
	}

	//Check if the user has permission to delete the task
	canDeleteTask(user: User, task: TaskType): boolean {
		return user && (this.isAdmin(user) || this.isCreator(user, task))
	}

	//Check if the user has permission to reassign the task
	canReassignTask(user: User, task: TaskType): boolean {
		return user && (this.isAdmin(user) || this.isModerator(user) || this.isCreator(user, task))
	}

	//Check if the user has permission to update the due date of the task
	canUpdateDueDate(user: User, task: TaskType): boolean {
		return (
			user &&
			(this.isAdmin(user) || this.isModerator(user) || this.isCreator(user, task) || this.isAssigned(user, task))
		)
	}

	async getPermissions(userId: string, resourceType: string, resourceId: string): Promise<any> {
		const isAdmin = await this.checkIfUserIsAdmin(userId)
		const isModerator = await this.checkIfUserIsModerator(userId)
		const isOwner = await this.checkIfUserIsOwner(userId, resourceType, resourceId)

		return {
			isAdmin,
			isModerator,
			isOwner,
			canAddUser: isAdmin,
			canRemoveUser: isAdmin && !isOwner,
			canDeletePost: isOwner,
			canUpdateProfile: isOwner || isAdmin,
			canAddModerator: isAdmin,
			canRemoveModerator: isAdmin && !isOwner,
		}
	}

	private async checkIfUserIsAdmin(userId: string): Promise<boolean> {
		//Check if user is an admin based on their userId
		if (userId === 'admin') {
			//Return true if they are,
			return true
		}
		return false
		//false otherwise
	}

	private async checkIfUserIsModerator(userId: string): Promise<boolean> {
		//Check if user is a moderator based on their userId
		if (userId === 'moderator') {
			//Return true if they are,
			return true
		}
		//false otherwise
		return false
	}

	private async checkIfUserIsOwner(userId: string, resourceType: string, resourceId: string): Promise<boolean> {
		// Get the resource by its ID and type
		// const resource = await getResourceByIdAndType(resourceId, resourceType)
		try {
			await this.checkIfUserIsOwner(userId, resourceType, resourceId);
			return true;
		} catch (error) {
			return false
		}
	}

	canEditPost(userId: string, postId: string): Promise<boolean> {
		//check if the user is the owner of the post
		return this.checkIfUserIsOwner(userId, 'post', postId)
	}

	//Check if a user has permission to view a project
	canViewProject(userId: string, projectMembers: string[]): boolean {
		//Only members of the project can view it
		if (userId) {
			return projectMembers.includes(userId)
		}
		return false
	}

	//Check if a user has permission to suggest reassigning a task to another user
	async canSuggestReassignTask(userId: string, taskOwnerId: string, task: any): Promise<boolean> {
		//Only admins, task owner, and task assignee can suggest reassigning the task
		return userId === taskOwnerId || await (this.checkIsAdminById(userId)) || this.isTaskAssignee(userId, task.assigneeId)
	}

	//Check if a user has permission to update the due date of a task
	async canUpdateTaskDueDate(userId: string, taskOwnerId: string, task: any): Promise<boolean> {
		//todo update task from any to the proper type value once task code has been created
		//Only admins, task owner, and task assignee can update the due date of the task
		return userId === taskOwnerId || await (this.checkIsAdminById(userId)) || this.isTaskAssignee(userId, task.assigneeId)
	}

	//Check if a user is an admin
	private async checkIsAdminById(userId: string): Promise<boolean> {
		//get user by ID from database
		const user = await this.userService.getUserById(userId); 
		//check if the user exists and has admin role
		if (user && user.roles.includes(UserRole.ADMIN)) {
			return true
		}
		return false
	}

	//Check if a user is the assignee of the task
	private async isTaskAssignee(userId: string, taskId: string): Promise<boolean> {
		// Retrieve the task by its ID
		const task = await this.userService.getTaskById(taskId);
		// Check if the task exists and if the assignee ID matches the user ID
		return !!task && task.assigneeId === userId;
	}
}
