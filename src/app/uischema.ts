export default {
  'type': 'Categorization',
  'elements': [
  {
    'type': 'Category',
    'label': 'Orders',
    'elements': [
      {
        'type': 'ListWithDetail',
        'scope': '#/properties/orders',
        'options': {
          'labelRef': '#/items/properties/customer/properties/name',
          'detail': {
            'type': 'VerticalLayout',
            'elements': [
              {
                'type': 'HorizontalLayout',
                'elements': [
                  {
                    'type': 'Control',
                    'scope': '#/properties/title'
                  },
                  {
                    'type': 'Control',
                    'scope': '#/properties/processId'
                  }
                ]
              },
              {
                'type': 'VerticalLayout',
                'elements': [
                  {
                    'type': 'VerticalLayout',
                    'elements': [
                      {

                        'type': 'Control',
                        'scope': '#/properties/assignee'
                      },
                      {
                        'type': 'HorizontalLayout',
                        'elements': [
                          {
                            'type': 'Control',
                            'scope': '#/properties/startDate'
                          },
                          {
                            'type': 'Control',
                            'scope': '#/properties/endDate'
                          }
                        ]
                      },
                      {
                        'type': 'Control',
                        'scope': '#/properties/status'
                      },
                      {
                        'type': 'Control',
                        'scope': '#/properties/ordered',
                        'options': {
                          'toggle': true
                        }
                      },
                      {
                        'type': 'Control',
                        'scope': '#/properties/amount',
                        'options': {
                          'slider': true
                        },
                        'rule': {
                          'effect': 'DISABLE',
                          'condition': {
                            'schema': {
                              'const': 'unordered'
                            },
                            'scope': '#/properties/status'
                          }
                        }
                      }

                    ]
                  }
                ]
              },
              {
                'type': 'Group',
                'label': 'Customer',
                'elements': [
                  {
                    'type': 'Control',
                    'scope': '#/properties/customer/properties/name'
                  },
                  {
                    'type': 'Control',
                    'scope': '#/properties/customer/properties/department'
                  },
                  {
                    'type': 'Control',
                    'scope': '#/properties/customer/properties/emailAddress'
                  },
                  {
                    'type': 'Control',
                    'scope': '#/properties/customer/properties/phone'
                  }
                ]
              }
            ]
          }
        }
      }
    ]
  },
  {
    'type': 'Category',
    'label': 'Calendar',
    'elements': [
      {
        'type': 'Label',
        'text': 'Currently Empty Category'
      }
    ]
  },
  {
    'type': 'Category',
    'label': 'Customers',
    'elements': [
      {
        'type': 'Label',
        'text': 'Currently Empty Category'
      }
    ]
  },
  {
    'type': 'Category',
    'label': 'Contracts',
    'elements': [
      {
        'type': 'Label',
        'text': 'Currently Empty Category'
      }
    ]
  }
]
};
