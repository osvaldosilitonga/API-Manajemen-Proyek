class ProjectsResponseDTO {
    constructor(project) {
        this.id = project._id
        this.name = project.name
        this.description = project.description
        this.created_at = project.createdAt
        this.updated_at = project.updatedAt
    }
}

module.exports = ProjectsResponseDTO;