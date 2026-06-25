locals {
  name = var.project

  azs = [
    "${var.aws_region}a",
    "${var.aws_region}c"
  ]

  tags = {
    Project = var.project
    Managed = "terraform"
  }
}