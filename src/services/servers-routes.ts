export class ServersRoutes {

    public static TOOLS_SERVER_URI : string = "https://ngspipes-tools-server.herokuapp.com/server";
    public static PIPELINES_SERVER_URI : string = "https://ngspipes-pipelines-server.herokuapp.com/server";
    public static REPOSITORY_FACADE_SERVER_URI : string = "https://ngspipes-repository-facade.herokuapp.com";
    public static API_SERVER_URI : string = "https://ngspipes-share-api.herokuapp.com";


    public static LOGIN_ROUTE : string = ServersRoutes.API_SERVER_URI + "/login";


    public static USERS_ROUTE : string = ServersRoutes.API_SERVER_URI + "/users";

    public static GET_ALL_USERS_ROUTE : string = ServersRoutes.USERS_ROUTE;
    public static GET_USER_ROUTE : string = ServersRoutes.USERS_ROUTE + "/{userName}";
    public static CREATE_USER_ROUTE : string = ServersRoutes.USERS_ROUTE;
    public static UPDATE_USER_ROUTE : string = ServersRoutes.USERS_ROUTE + "/{userName}";
    public static DELETE_USER_ROUTE : string = ServersRoutes. USERS_ROUTE + "/{userName}";
    public static GET_USER_IMAGE_ROUTE : string = ServersRoutes.USERS_ROUTE + "/{userName}/image";
    public static CHANGE_USER_IMAGE_ROUTE : string = ServersRoutes.USERS_ROUTE + "/{userName}/image";
    public static DELETE_USER_IMAGE_ROUTE : string = ServersRoutes.USERS_ROUTE + "/{userName}/image";
    public static CHANGE_USER_PASSWORD_ROUTE : string = ServersRoutes.USERS_ROUTE + "/{userName}/password";
    public static GET_USERS_NAMES_ROUTE : string = ServersRoutes.API_SERVER_URI + "/usersnames";


    public static GROUPS_ROUTE : string = ServersRoutes.API_SERVER_URI + "/groups";

    public static GET_ALL_GROUPS_ROUTE : string = ServersRoutes.GROUPS_ROUTE;
    public static GET_GROUP_ROUTE : string = ServersRoutes.GROUPS_ROUTE + "/{groupName}";
    public static CREATE_GROUP_ROUTE : string = ServersRoutes.GROUPS_ROUTE;
    public static UPDATE_GROUP_ROUTE : string = ServersRoutes.GROUPS_ROUTE + "/{groupName}";
    public static DELETE_GROUP_ROUTE : string = ServersRoutes.GROUPS_ROUTE + "/{groupName}";
    public static GET_GROUP_IMAGE_ROUTE : string = ServersRoutes.GROUPS_ROUTE + "/{groupName}/image";
    public static CHANGE_GROUP_IMAGE_ROUTE : string = ServersRoutes.GROUPS_ROUTE + "/{groupName}/image";
    public static DELETE_GROUP_IMAGE_ROUTE : string = ServersRoutes.GROUPS_ROUTE + "/{groupName}/image";
    public static GET_GROUPS_NAMES_ROUTE : string = ServersRoutes.API_SERVER_URI + "/groupsnames";


    public static GROUP_MEMBERS_ROUTE : string = ServersRoutes.API_SERVER_URI + "/groupmembers";

    public static GET_ALL_GROUP_MEMBERS_ROUTE : string = ServersRoutes.GROUP_MEMBERS_ROUTE;
    public static GET_GROUP_MEMBER_ROUTE : string = ServersRoutes.GROUP_MEMBERS_ROUTE + "/{memberId}";
    public static CREATE_GROUP_MEMBER_ROUTE : string = ServersRoutes.GROUP_MEMBERS_ROUTE;
    public static UPDATE_GROUP_MEMBER_ROUTE : string = ServersRoutes.GROUP_MEMBERS_ROUTE + "/{memberId}";
    public static DELETE_GROUP_MEMBER_ROUTE : string = ServersRoutes.GROUP_MEMBERS_ROUTE + "/{memberId}";


    public static ACCESS_TOKEN_ROUTE : string = ServersRoutes.API_SERVER_URI + "/tokens";

    public static GET_ACCESS_TOKEN_ROUTE : string = ServersRoutes.ACCESS_TOKEN_ROUTE + "/{tokenId}";
    public static CREATE_ACCESS_TOKEN_ROUTE : string = ServersRoutes.ACCESS_TOKEN_ROUTE;
    public static UPDATE_ACCESS_TOKEN_ROUTE : string = ServersRoutes.ACCESS_TOKEN_ROUTE + "/{tokenId}";
    public static DELETE_ACCESS_TOKEN_ROUTE : string = ServersRoutes.ACCESS_TOKEN_ROUTE + "/{tokenId}";
    public static GET_ACCESS_TOKENS_OF_USER : string = ServersRoutes.ACCESS_TOKEN_ROUTE;


    public static REPOSITORIES_ROUTE : string = ServersRoutes.API_SERVER_URI + "/repositories";

    public static GET_ALL_REPOSITORIES_ROUTE : string = ServersRoutes.REPOSITORIES_ROUTE;
    public static GET_REPOSITORY_ROUTE : string = ServersRoutes.REPOSITORIES_ROUTE + "/{repositoryName}";
    public static CREATE_REPOSITORY_ROUTE : string = ServersRoutes.REPOSITORIES_ROUTE;
    public static UPDATE_REPOSITORY_ROUTE : string = ServersRoutes.REPOSITORIES_ROUTE + "/{repositoryName}";
    public static DELETE_REPOSITORY_ROUTE : string = ServersRoutes.REPOSITORIES_ROUTE + "/{repositoryName}";
    public static GET_REPOSITORIES_NAMES_ROUTE : string = ServersRoutes.API_SERVER_URI + "/repositoriesnames";


    public static REPOSITORY_GROUP_MEMBERS_ROUTE : string = ServersRoutes.API_SERVER_URI + "/repositorygroupmembers";

    public static GET_ALL_REPOSITORY_GROUP_MEMBERS_ROUTE : string = ServersRoutes.REPOSITORY_GROUP_MEMBERS_ROUTE;
    public static GET_REPOSITORY_GROUP_MEMBER_ROUTE : string = ServersRoutes.REPOSITORY_GROUP_MEMBERS_ROUTE + "/{memberId}";
    public static CREATE_REPOSITORY_GROUP_MEMBER_ROUTE : string = ServersRoutes.REPOSITORY_GROUP_MEMBERS_ROUTE;
    public static UPDATE_REPOSITORY_GROUP_MEMBER_ROUTE : string = ServersRoutes.REPOSITORY_GROUP_MEMBERS_ROUTE + "/{memberId}";
    public static DELETE_REPOSITORY_GROUP_MEMBER_ROUTE : string = ServersRoutes.REPOSITORY_GROUP_MEMBERS_ROUTE + "/{memberId}";


    public static REPOSITORY_USER_MEMBERS_ROUTE : string = ServersRoutes.API_SERVER_URI + "/repositoryusermembers";

    public static GET_ALL_REPOSITORY_USER_MEMBERS_ROUTE : string = ServersRoutes.REPOSITORY_USER_MEMBERS_ROUTE;
    public static GET_REPOSITORY_USER_MEMBER_ROUTE : string = ServersRoutes.REPOSITORY_USER_MEMBERS_ROUTE + "/{memberId}";
    public static CREATE_REPOSITORY_USER_MEMBER_ROUTE : string = ServersRoutes.REPOSITORY_USER_MEMBERS_ROUTE;
    public static UPDATE_REPOSITORY_USER_MEMBER_ROUTE : string = ServersRoutes.REPOSITORY_USER_MEMBERS_ROUTE + "/{memberId}";
    public static DELETE_REPOSITORY_USER_MEMBER_ROUTE : string = ServersRoutes.REPOSITORY_USER_MEMBERS_ROUTE + "/{memberId}";


    public static TOOLS_REPOSITORY_FACADE_ROUTE : string = ServersRoutes.REPOSITORY_FACADE_SERVER_URI + "/tools";

    public static TOOLS_FACADE_GET_LOGO_ROUTE : string = ServersRoutes.TOOLS_REPOSITORY_FACADE_ROUTE + "/getlogo";
    public static TOOLS_FACADE_SET_LOGO_ROUTE : string = ServersRoutes.TOOLS_REPOSITORY_FACADE_ROUTE + "/setlogo";
    public static TOOLS_FACADE_GET_TOOLS_NAMES_ROUTE : string = ServersRoutes.TOOLS_REPOSITORY_FACADE_ROUTE + "/gettoolsnames";
    public static TOOLS_FACADE_GET_ALL_TOOLS_ROUTE : string = ServersRoutes.TOOLS_REPOSITORY_FACADE_ROUTE + "/gettools";
    public static TOOLS_FACADE_GET_TOOL_ROUTE : string = ServersRoutes.TOOLS_REPOSITORY_FACADE_ROUTE + "/gettool/{toolName}";
    public static TOOLS_FACADE_INSERT_TOOL_ROUTE : string = ServersRoutes.TOOLS_REPOSITORY_FACADE_ROUTE + "/inserttool";
    public static TOOLS_FACADE_UPDATE_TOOL_ROUTE : string = ServersRoutes.TOOLS_REPOSITORY_FACADE_ROUTE + "/updatetool/{toolName}";
    public static TOOLS_FACADE_DELETE_TOOL_ROUTE : string = ServersRoutes.TOOLS_REPOSITORY_FACADE_ROUTE + "/deletetool/{toolName}";


    public static PIPELINES_REPOSITORY_FACADE_ROUTE : string = ServersRoutes.REPOSITORY_FACADE_SERVER_URI + "/pipelines";

    public static PIPELINES_FACADE_GET_LOGO_ROUTE : string = ServersRoutes.PIPELINES_REPOSITORY_FACADE_ROUTE + "/getlogo";
    public static PIPELINES_FACADE_SET_LOGO_ROUTE : string = ServersRoutes.PIPELINES_REPOSITORY_FACADE_ROUTE + "/setlogo";
    public static PIPELINES_FACADE_GET_PIPELINES_NAMES_ROUTE : string = ServersRoutes.PIPELINES_REPOSITORY_FACADE_ROUTE + "/getpipelinesnames";
    public static PIPELINES_FACADE_GET_ALL_PIPELINES_ROUTE : string = ServersRoutes.PIPELINES_REPOSITORY_FACADE_ROUTE + "/getpipelines";
    public static PIPELINES_FACADE_GET_PIPELINE_ROUTE : string = ServersRoutes.PIPELINES_REPOSITORY_FACADE_ROUTE + "/getpipeline/{pipelineName}";
    public static PIPELINES_FACADE_INSERT_PIPELINE_ROUTE : string = ServersRoutes.PIPELINES_REPOSITORY_FACADE_ROUTE + "/insertpipeline";
    public static PIPELINES_FACADE_UPDATE_PIPELINE_ROUTE : string = ServersRoutes.PIPELINES_REPOSITORY_FACADE_ROUTE + "/updatepipeline/{pipelineName}";
    public static PIPELINES_FACADE_DELETE_PIPELINE_ROUTE : string = ServersRoutes.PIPELINES_REPOSITORY_FACADE_ROUTE + "/deletepipeline/{pipelineName}";


    public static IMPORT_ROUTE : string = ServersRoutes.API_SERVER_URI + "/import";

    public static IMPORT_TOOLS_ROUTE : string = ServersRoutes.IMPORT_ROUTE + "/tools";
    public static IMPORT_PIPELINES_ROUTE : string = ServersRoutes.IMPORT_ROUTE + "/pipelines";


    public static EXPORT_ROUTE : string = ServersRoutes.API_SERVER_URI + "/export";

    public static EXPORT_TOOLS_ROUTE : string = ServersRoutes.EXPORT_ROUTE + "/tools";
    public static EXPORT_PIPELINES_ROUTE : string = ServersRoutes.EXPORT_ROUTE + "/pipelines";


}
