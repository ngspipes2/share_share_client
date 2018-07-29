export class Server {

    private static AUTHENTICATION_SERVER_URI : string = "http://localhost:1111";
    private static TOOLS_REPOSITORY_SERVER_URI : string = "http://localhost:1112";
    private static PIPELINES_REPOSITORY_SERVER_URI : string = "http://localhost:1113";

    public static AUTHENTICATION_URI = Server.AUTHENTICATION_SERVER_URI + "/authenticate";

    public static GET_ALL_USERS : string = Server.AUTHENTICATION_SERVER_URI + "/users";
    public static GET_USER : string = Server.AUTHENTICATION_SERVER_URI + "/users/{userName}";
    public static INSERT_USER : string = Server.AUTHENTICATION_SERVER_URI + "/users";
    public static UPDATE_USER : string = Server.AUTHENTICATION_SERVER_URI + "/users/{userName}";
    public static DELETE_USER : string = Server.AUTHENTICATION_SERVER_URI + "/users/{userName}";

    public static GET_ALL_GROUPS : string = Server.AUTHENTICATION_SERVER_URI + "/groups";
    public static GET_GROUP : string = Server.AUTHENTICATION_SERVER_URI + "/groups/{groupName}";
    public static INSERT_GROUP : string = Server.AUTHENTICATION_SERVER_URI + "/groups";
    public static UPDATE_GROUP : string = Server.AUTHENTICATION_SERVER_URI + "/groups/{groupName}";
    public static DELETE_GROUP : string = Server.AUTHENTICATION_SERVER_URI + "/groups/{groupName}";
    public static GET_GROUPS_OF_USER : string = Server.AUTHENTICATION_SERVER_URI + "/groups/owner/{userName}";
    public static GET_GROUPS_WITH_MEMBER : string = Server.AUTHENTICATION_SERVER_URI + "/groups/member/{userName}";

    public static GET_ALL_TOOLS_REPOSITORIES : string = Server.TOOLS_REPOSITORY_SERVER_URI + "/toolsrepositories";
    public static GET_TOOLS_REPOSITORY : string = Server.TOOLS_REPOSITORY_SERVER_URI + "/toolsrepositories/{repositoryId}";
    public static INSERT_TOOLS_REPOSITORY : string = Server.TOOLS_REPOSITORY_SERVER_URI + "/toolsrepositories";
    public static UPDATE_TOOLS_REPOSITORY : string = Server.TOOLS_REPOSITORY_SERVER_URI + "/toolsrepositories/{repositoryId}";
    public static DELETE_TOOLS_REPOSITORY : string = Server.TOOLS_REPOSITORY_SERVER_URI + "/toolsrepositories/{repositoryId}";
    public static GET_TOOLS_REPOSITORIES_OF_USER : string = Server.TOOLS_REPOSITORY_SERVER_URI + "/toolsrepositories/owner/{userName}";

    public static GET_ALL_PIPELINES_REPOSITORIES : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/pipelinesrepositories";
    public static GET_PIPELINES_REPOSITORY : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/pipelinesrepositories/{repositoryId}";
    public static INSERT_PIPELINES_REPOSITORY : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/pipelinesrepositories";
    public static UPDATE_PIPELINES_REPOSITORY : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/pipelinesrepositories/{repositoryId}";
    public static DELETE_PIPELINES_REPOSITORY : string =  Server.PIPELINES_REPOSITORY_SERVER_URI + "/pipelinesrepositories/{repositoryId}";
    public static GET_PIPELINES_REPOSITORIES_OF_USER : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/pipelinesrepositories/owner/{userName}";

    public static GET_USER_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/users" + "/{userName}";
    public static UPDATE_USER_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/users" + "/{userName}";
    public static DELETE_USER_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/users" + "/{userName}";

    public static GET_GROUP_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/groups" + "/{groupName}";
    public static UPDATE_GROUP_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/groups" + "/{groupName}";
    public static DELETE_GROUP_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/groups" + "/{groupName}";

    public static GET_TOOLS_REPOSITORY_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/toolsRepository" + "/{repositoryId}";
    public static UPDATE_TOOLS_REPOSITORY_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/toolsRepository" + "/{repositoryId}";
    public static DELETE_TOOLS_REPOSITORY_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/toolsRepository" + "/{repositoryId}";

    public static GET_PIPELINES_REPOSITORY_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/pipelinesRepository" + "/{repositoryId}";
    public static UPDATE_PIPELINES_REPOSITORY_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/pipelinesRepository" + "/{repositoryId}";
    public static DELETE_PIPELINES_REPOSITORY_IMAGE : string = Server.PIPELINES_REPOSITORY_SERVER_URI + "/images/pipelinesRepository" + "/{repositoryId}";

}
