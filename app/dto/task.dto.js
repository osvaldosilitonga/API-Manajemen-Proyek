class TasksResponseDTO {
    constructor(project) {
        this.id = project._id
        this.title = project.title
        this.description = project.description
        this.is_complete = project.is_complete
        this.start_time = project.start_time
        this.end_time = project.end_time
        this.created_at = project.createdAt
        this.updated_at = project.updatedAt
    }
}

module.exports = TasksResponseDTO;