import yup from 'yup';


const validateSchema = yup.object().shape({
    items: yup.array().of(
      yup.lazy((item: { itemName: string; itemDescription: string }) => {
        return yup.object({
          itemName: yup.string().test('validate', 'warning', (value) => {
            if (value && item.itemDescription) return true
            if (!value && !item.itemDescription) return true
            return false
          }),
          itemDescription: yup.string().test('validate', 'warning', (value) => {
            if (value && item.itemName) return true
            if (!value && !item.itemName) return true
            return false
          }),
        })
      }),
    ),
  })
  
  // #todo
  // To ensure that tasks are not only placed with users but also separated by teams and/or projects, you would need to have a system in place that allows for:
  
  // 1. Team and project creation: You should be able to create teams and projects and assign members to each one.
  
  // 2. Task assignment by team and project: When assigning tasks, you should be able to select the team and project the task belongs to.
  
  // 3. Task filtering by team and project: Users should be able to filter tasks based on the team and project they belong to, to easily see what tasks are relevant to them.
  
  // 4. User access control: Access to tasks should be restricted based on team and project membership, so that users can only see and edit tasks that are relevant to them.
  
  // 5. Reporting and analytics by team and project: You should be able to generate reports and analytics based on team and project performance, to help manage workload and optimize resource allocation.
  
  // Overall, you would need a task management system that allows for team and project creation, task assignment by team and project, task filtering by team and project, user access control, and reporting and analytics by team and project. This would ensure that tasks are appropriately assigned, managed, and tracked based on team and project membership.