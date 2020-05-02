export const data = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: '3fs Frontend Test',
    description: 'API specification for the 3fs Frontend applicants\n\n## Authorization\n\nToken should be passed in the Authorization header:\n\n```\nAuthorization: Token your-token\n```\n\n# Authentication\n\n<!-- ReDoc-Inject: <security-definitions> -->'
  },
  paths: {
    '/locations': {
      get: {
        summary: 'Retrieve a list of storage locations.',
        security: [
          {
            Token: []
          }
        ],
        responses: {
          200: {
            $ref: '#/components/responses/Locations'
          }
        }
      }
    },
    '/buckets': {
      get: {
        summary: 'Retrieve a list of buckets.',
        security: [
          {
            Token: []
          }
        ],
        responses: {
          200: {
            $ref: '#/components/responses/Buckets'
          }
        }
      },
      post: {
        summary: 'Create a bucket',
        security: [
          {
            Token: []
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                required: [
                  'name',
                  'location'
                ],
                properties: {
                  name: {
                    type: 'string'
                  },
                  location: {
                    type: 'string',
                    format: 'uuid'
                  }
                }
              }
            }
          },
          description: 'A Bucket to create',
          required: true
        },
        responses: {
          201: {
            $ref: '#/components/responses/Bucket'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          409: {
            $ref: '#/components/responses/Conflict'
          }
        }
      }
    },
    '/buckets/{bucket}': {
      parameters: [
        {
          name: 'bucket',
          in: 'path',
          required: true,
          description: 'Bucket\'s ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      get: {
        summary: 'Retrieve a single bucket.',
        security: [
          {
            Token: []
          }
        ],
        responses: {
          200: {
            $ref: '#/components/responses/Bucket'
          },
          404: {
            $ref: '#/components/responses/NotFound'
          }
        }
      },
      delete: {
        summary: 'Delete a single Object.',
        security: [
          {
            Token: []
          }
        ],
        responses: {
          204: {
            description: 'Object has been deleted successfully'
          },
          404: {
            $ref: '#/components/responses/NotFound'
          }
        }
      }
    },
    '/buckets/{bucket}/objects': {
      parameters: [
        {
          name: 'bucket',
          in: 'path',
          required: true,
          description: 'Bucket\'s ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      get: {
        summary: 'Retrieve a list of objects.',
        security: [
          {
            Token: []
          }
        ],
        responses: {
          200: {
            $ref: '#/components/responses/Objects'
          }
        }
      },
      post: {
        summary: 'Create an Object',
        security: [
          {
            Token: []
          }
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: {
                    description: 'File to be uploaded',
                    type: 'string',
                    format: 'binary'
                  }
                },
                required: [
                  'file'
                ]
              }
            }
          }
        },
        responses: {
          201: {
            $ref: '#/components/responses/Object'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          404: {
            $ref: '#/components/responses/NotFound'
          }
        }
      }
    },
    '/buckets/{bucket}/objects/{object}': {
      parameters: [
        {
          name: 'bucket',
          in: 'path',
          required: true,
          description: 'Bucket\'s ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        },
        {
          name: 'object',
          in: 'path',
          required: true,
          description: 'Object\'s ID',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      delete: {
        summary: 'Delete a single Object.',
        security: [
          {
            Token: []
          }
        ],
        responses: {
          204: {
            description: 'Object has been deleted successfully'
          },
          404: {
            $ref: '#/components/responses/NotFound'
          }
        }
      }
    }
  },
  servers: [
    {
      url: 'https://challenge.3fs.si/storage'
    }
  ],
  components: {
    responses: {
      BadRequest: {
        description: 'Request is badly formatted.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            examples: {
              response: {
                value: {
                  message: 'Request is badly formatted.'
                }
              }
            }
          }
        }
      },
      Bucket: {
        description: 'Returns a single bucket',
        content: {
          'application/json': {
            schema: {
              required: [
                'bucket'
              ],
              properties: {
                bucket: {
                  $ref: '#/components/schemas/Bucket'
                }
              }
            },
            examples: {
              response: {
                value: {
                  bucket: {
                    id: 'my-awesome-bucket',
                    name: 'my-awesome-bucket',
                    location: {
                      id: 'a0c51094-05d9-465f-8745-6cd9ee45b96d',
                      name: 'Kranj'
                    }
                  }
                }
              }
            }
          }
        }
      },
      Buckets: {
        description: 'Returns a list of buckets',
        content: {
          'application/json': {
            schema: {
              required: [
                'buckets'
              ],
              properties: {
                buckets: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Bucket'
                  }
                }
              }
            },
            examples: {
              response: {
                value: {
                  buckets: {
                    id: 'my-awesome-bucket',
                    name: 'my-awesome-bucket',
                    location: {
                      id: 'a0c51094-05d9-465f-8745-6cd9ee45b96d',
                      name: 'Kranj'
                    }
                  }
                }
              }
            }
          }
        }
      },
      Conflict: {
        description: 'The request could not be completed due to a conflict with the current state',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            examples: {
              response: {
                value: {
                  message: 'Entity with this name already exists'
                }
              }
            }
          }
        }
      },
      Locations: {
        description: 'Returns a list of object storage locations',
        content: {
          'application/json': {
            schema: {
              required: [
                'locations'
              ],
              properties: {
                locations: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Location'
                  }
                }
              }
            },
            examples: {
              response: {
                value: {
                  locations: {
                    id: 'a0c51094-05d9-465f-8745-6cd9ee45b96d',
                    name: 'Kranj'
                  }
                }
              }
            }
          }
        }
      },
      NotFound: {
        description: 'Required entity cannot be found.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            },
            examples: {
              response: {
                value: {
                  message: 'Required entity cannot be found.'
                }
              }
            }
          }
        }
      },
      Object: {
        description: 'Returns Object entity.',
        content: {
          'application/json': {
            schema: {
              required: [
                'object'
              ],
              properties: {
                object: {
                  $ref: '#/components/schemas/Object'
                }
              }
            },
            examples: {
              response: {
                value: {
                  object: {
                    name: 'my-file.png',
                    modified: '2019-09-18T09:26:51.342Z',
                    size: 1337
                  }
                }
              }
            }
          }
        }
      },
      Objects: {
        description: 'Returns a list of objects',
        content: {
          'application/json': {
            schema: {
              required: [
                'objects'
              ],
              properties: {
                objects: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Object'
                  }
                }
              }
            },
            examples: {
              response: {
                value: {
                  objects: {
                    name: 'my-file.png',
                    modified: '2019-09-18T09:26:51.342Z',
                    size: 1337
                  }
                }
              }
            }
          }
        }
      }
    },
    securitySchemes: {
      Token: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    schemas: {
      Bucket: {
        type: 'object',
        description: 'Bucket represent an object storage container',
        required: [
          'id',
          'name',
          'location'
        ],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Universal unique identifier'
          },
          name: {
            type: 'string',
            description: 'Human readable name'
          },
          location: {
            $ref: '#/components/schemas/Location'
          }
        }
      },
      Error: {
        properties: {
          message: {
            type: 'string'
          }
        }
      },
      Location: {
        type: 'object',
        description: 'Location represents a physical location where bucket resources are located.',
        required: [
          'id',
          'name'
        ],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Universal unique identifier'
          },
          name: {
            type: 'string',
            description: 'Human readable name'
          }
        }
      },
      Object: {
        type: 'object',
        description: 'Object represents an object storage object',
        required: [
          'name',
          'last_modified',
          'size'
        ],
        properties: {
          name: {
            type: 'string',
            description: 'Human readable name'
          },
          last_modified: {
            type: 'string',
            format: 'dateTime',
            description: 'Value in ISO8601 format representing date and time when the Bucket was created'
          },
          size: {
            type: 'integer',
            format: 'int64',
            description: 'File size in bytes'
          }
        }
      }
    }
  }
};
