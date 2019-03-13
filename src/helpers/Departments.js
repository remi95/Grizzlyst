/**
 * Class Departments containing methods for departments managing.
 */
import store from "../store";

class Departments {

    getDepartmentName = (departmentId) => {
        let department = this.getDepartment(departmentId);

        return department !== '' ? department.name : '';
    };

    getDepartment = (departmentId) => {
        const departments = store.getState().listReducer.departmentsReference;

        if (departments.length <=0) {
            return '';
        }

        for (let department of departments) {
            if (department.id === departmentId) {
                return department;
            }
        }

        return '';
    };
}

const DepartmentsHelper = new Departments();

export default DepartmentsHelper;