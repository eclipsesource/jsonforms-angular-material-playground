export default {
  type: 'Categorization',
  elements: [
    {
      type: 'Category',
      label: 'Orders',
      elements: [
        {
          type: 'ListWithDetail',
          scope: '#/properties/orders',
          options: {
            labelRef: '#/items/properties/customer/properties/name',
            detail: {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'HorizontalLayout',
                  elements: [
                    {
                      type: 'Control',
                      scope: '#/properties/title'
                    },
                    {
                      type: 'Control',
                      scope: '#/properties/processId'
                    },
                  ]
                },
                {
                  type: 'Group',
                  label: 'Customer',
                  elements: [
                    {
                      type: 'Control',
                      label: 'ID',
                      scope: '#/properties/customer/properties/id'
                    },
                    {
                      type: 'Control',
                      label: 'Name',
                      scope: '#/properties/customer/properties/name'
                    },
                    {
                      type: 'Control',
                      label: 'Department',
                      scope: '#/properties/customer/properties/department'
                    }
                  ]
                },
                {
                  type: 'VerticalLayout',
                  elements: [
                    {
                      type: 'VerticalLayout',
                      elements: [
                        {
                          type: 'HorizontalLayout',
                          elements: [

                            {
                              type: 'Control',
                              scope: '#/properties/ordered'
                            },
                            {
                              type: 'Control',
                              scope: '#/properties/assignee'
                            }
                          ]
                        },
                        {
                          type: 'HorizontalLayout',
                          elements: [
                            {
                              type: 'Control',
                              scope: '#/properties/startDate'
                            },
                            {
                              type: 'Control',
                              scope: '#/properties/endDate'
                            }
                          ]
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/status'
                        }
                      ]
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
      type: 'Category',
      label: 'Calendar',
      elements: [
      ]
    },
    {
      type: 'Category',
      label: 'Customers',
      elements: [
      ]
    },
    {
      type: 'Category',
      label: 'Contracts',
      elements: [
      ]
    },
    {
      type: 'Category',
      label: 'Items',
      elements: [
      ]
    }
  ]
};
