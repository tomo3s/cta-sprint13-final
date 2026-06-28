variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "project" {
  type    = string
  default = "ct-final"
}

variable "domain_name" {
  type = string
}

variable "frontend_domain" {
  type = string
}

variable "api_domain" {
  type = string
}

variable "db_username" {
  type    = string
  default = "admin"
}

variable "db_password" {
  type      = string
  sensitive = true
}
