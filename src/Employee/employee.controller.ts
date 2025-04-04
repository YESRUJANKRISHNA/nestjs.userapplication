import { Controller, Get, Post, Patch, Param, Body, Delete, HttpException, HttpStatus, UploadedFile, UseInterceptors, Put } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { Employee } from "./employee.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path, { extname } from "path";
import { retry } from "rxjs";
import { strict } from "assert";
import { get } from "http";

@Controller("employee") 
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post("add")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads", 
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, file.fieldname + "-" + uniqueSuffix + extname(file.originalname));
        },
      }),
    })
  )
  async addEmployee(
    @Body() employeeData: Partial<Employee>,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Employee> {
    if (file) {
      employeeData.filePath = file.filename; 
    }
    return this.employeeService.addEmployee(employeeData);
  }

  @Get()
  async getAllEmployees(): Promise<Employee[]> {  
    return this.employeeService.getAllEmployees();
  }

  @Patch(":id/edit")
  async editEmployee(
      @Param("id") id: number, 
      @Body() edited:boolean
  ): Promise<string> {
      return this.employeeService.editEmployee(id, edited);
  }
@Patch(":id/verify")
async verifyEmployee(@Param('id') id:number,@Body() verified:boolean):Promise<string>{
  return this.employeeService.verifyEmployee(id,verified);
}
@Patch(":id/submit")
async submitEmployee(@Param('id') id:number ):Promise<string>{
  return this.employeeService.submitEmployee(id);
}
  
@Delete(":id")
async deleteEmployee(@Param('id') id:number ):Promise<boolean>{
return this.employeeService.deleteEmployee(id);
}


}

