import { Component, OnInit } from '@angular/core';
import * as swaggerSpec from './swagger';

declare const SwaggerUIBundle: any;

@Component({
  selector: 'app-swagger-ui',
  templateUrl: './swagger-ui.component.html',
  styleUrls: ['./swagger-ui.component.css']
})
export class SwaggerUiComponent implements OnInit {

  title = '3fs Frontend Test';
  constructor() { }

  ngOnInit(): void {

    const ui = SwaggerUIBundle({
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIBundle.SwaggerUIStandalonePreset
      ],
      spec: swaggerSpec.data
      ,
      docExpansion: 'none',
      operationsSorter: 'alpha'
    });
  }

}
