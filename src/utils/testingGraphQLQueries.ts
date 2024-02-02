export const deleteEmployee = `
mutation Del($id: ID!) {
    deleteOneEmployee(input: { id: $id }) {
      id
      title
      firstname
      lastname
    }
}
`;

export const createEmployee = `
mutation {
    createOneEmployee(input: { employee: {
        firstname: "Michael", 
        lastname: "Groovy", 
        salary: 3400, 
        title: "Manager", 
        department: "finance", 
        date_of_birth: "2000-10-05T14:00:00.000Z", 
        date_of_joining: "2018-10-05T14:00:00.000Z"  
        } }) {
      id
      title
      firstname
      lastname
      salary
      department
      date_of_birth
      date_of_joining
    }
}
`;

export const updateEmployee = `
mutation Upd($id: ID!) {
    updateOneEmployee(input: { id: $id, update: { lastname: "Black" } }) {
      id
      title
      firstname
      lastname
      salary
      department
      date_of_birth
      date_of_joining
    }
}
`;

export const employeesList = `
{
    employees{
      pageInfo{
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges{
        node{
          id
          title
          salary
          department
          date_of_birth
          date_of_joining
          created_at
          updated_at
        }
        cursor
      }
    }
  }
`;

export const employeeDetails = `
query Details($id: ID!) {
    employee(id: $id) {
      id
      title
      firstname
      lastname
      salary
      department
      date_of_birth
      date_of_joining
      updated_at
      created_at
    }
}
`;
