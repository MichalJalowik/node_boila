export const deleteEmployee = `
mutation Dup($id: ID!) {
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
mutation {
    updateOneEmployee(input: { id: 3, update: { lastname: "Black" } }) {
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
