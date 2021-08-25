import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export enum UserEnrollmentType {
  DesignerEnrollment = 'DesignerEnrollment',
  ObserverEnrollment = 'ObserverEnrollment',
  StudentEnrollment = 'StudentEnrollment',
  TaEnrollment = 'TaEnrollment',
  TeacherEnrollment = 'TeacherEnrollment'
}

export class SectionUserDto {
  @ApiProperty()
  @IsNotEmpty()
  loginId: string

  @ApiProperty({ enum: UserEnrollmentType })
  @IsNotEmpty()
  type: UserEnrollmentType

  constructor (loginId: string, type: UserEnrollmentType) {
    this.loginId = loginId
    this.type = type
  }
}

export class SectionUsersDto {
  @ApiProperty({ type: [SectionUserDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(400)
  @ValidateNested({ each: true })
  @Type(() => SectionUserDto)
  users: SectionUserDto[]

  constructor (users: SectionUserDto[]) {
    this.users = users
  }
}
