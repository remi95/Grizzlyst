/**
 * Class Departments containing methods for departments managing.
 */
import store from "../store";

class Departments {

    getDepartmentName = (departmentId) => {
        let department = this.getDepartmentById(departmentId);

        return department !== '' ? department.name : '';
    };

    getDepartmentId = (departmentName) => {
        let department = this.getDepartmentByName(departmentName);

        return department !== '' ? department.id : '';
    };

    getDepartmentById = (departmentId) => {
        let departments = store.getState().listReducer.departmentsReference;

        if (departments.length <= 0) {
            return '';
        }

        for (let department of departments) {
            if (department.id === departmentId) {
                return department;
            }
        }

        return '';
    };

    getDepartmentByName = (departmentName) => {
        let departments = store.getState().listReducer.departmentsReference;

        if (departments.length <= 0) {
            return '';
        }

        for (let department of departments) {
            if (department.name === departmentName) {
                return department;
            }
        }

        return '';
    };
}

const DepartmentsHelper = new Departments();

export default DepartmentsHelper;