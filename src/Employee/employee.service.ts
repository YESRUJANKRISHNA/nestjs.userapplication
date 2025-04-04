import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { Employee } from "./employee.entity";



@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) { }

  async addEmployee(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  async verifyEmployee(id: number, verified: boolean): Promise<string> {
   
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    employee.verified=true;
    await this.employeeRepository.update(id,{verified});
    return `Employee with ID ${id} has been verified successfully.`;
  }

  async editEmployee(id: number, edited: boolean): Promise<string> {
    

    const employee = await this.employeeRepository.findOne({ where: { id } });

    if (!employee) {
        console.log("Employee Not Found!");
        throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    Object.assign(employee, edited);

    employee.edited = edited;

    await this.employeeRepository.update(id,employee);


    return `Employee ${id} has been successfully updated.`;
}

  async submitEmployee(id: number): Promise<string> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    employee.submitted = true;
    await this.employeeRepository.save(employee);
    return `Employee with ID ${id} has been submitted successfully.`;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    const result: DeleteResult = await this.employeeRepository.delete(id);
    return (result.affected || 0) > 0;
  }
async getAllEmployees(): Promise<Employee[]> {
return this.employeeRepository.find();
  }
}
