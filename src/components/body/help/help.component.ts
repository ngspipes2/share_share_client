import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const TUTORIALS_DATA: any[] = [
    {
        name:"Account",
        children:[
            {id:"createAccount.mp4", name:"Create Account"},
            {id:"login.mp4", name:"Login"}
        ]
    },
    {
        name:"Repositories",
        children:[
            {id:"createRepository.mp4", name:"Create Repository"},
            {id:"publishRepository.mp4", name:"Publish Repository"},
            {id:"configRepository.mp4", name:"Configure Repository"},
            {id:"downloadRepository.mp4", name:"Download Repository"},
            {id:"deleteRepository.mp4", name:"Delete Repository"}
        ]
    },
    {
        name:"Tools",
        children:[
            {id:"createTool.mp4", name:"Create Tool"},
            {id:"editTool.mp4", name:"Edit Tool"},
            {id:"updateTool.mp4", name:"Update Tool"},
            {id:"downloadTool.mp4", name:"Download Tool"},
            {id:"cloneTools.mp4", name:"Clone Tools"},
            {id:"deleteTool.mp4", name:"Delete Tool"}
        ]
    },
    {
        name:"Pipelines",
        children:[
            {id:"createPipeline.mp4", name:"Create Pipeline"},
            {id:"editPipeline.mp4", name:"Edit Pipeline"},
            {id:"updatePipeline.mp4", name:"Update Pipeline"},
            {id:"downloadPipeline.mp4", name:"Download Pipeline"},
            {id:"clonePipelines.mp4", name:"Clone Pipelines"},
            {id:"deletePipeline.mp4", name:"Delete Pipeline"}
        ]
    },
    {
        name:"Others",
        children:[
            {id:"findUser.mp4", name:"Find User"},
            {id:"findRepository.mp4", name:"Find Repository"}
        ]
    }
];

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

    tutorials: any[];
    tutorial: any;



    constructor(private route: ActivatedRoute) {
        this.tutorials = TUTORIALS_DATA;
    }



    ngOnInit() {
        this.route.queryParams
        .subscribe(params => {
            TUTORIALS_DATA.forEach(tag => {
                tag.children.forEach((tutorial) => {
                    if(tutorial.id === params.tutorial)
                        this.tutorial = tutorial;
                });
            });
        });
    }

}
