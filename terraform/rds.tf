resource "aws_db_subnet_group" "main" {
  name = "${local.name}-db-subnet-group"

  subnet_ids = aws_subnet.private_db[*].id

  tags = merge(local.tags, {
    Name = "${local.name}-db-subnet-group"
  })
}

resource "aws_db_instance" "mysql" {

  identifier = "${local.name}-mysql"

  engine         = "mysql"
  engine_version = "8.0"

  instance_class = "db.t4g.micro"

  allocated_storage = 20
  storage_type      = "gp3"

  db_name  = "cloudtech_hotel"
  username = var.db_username
  password = var.db_password

  port = 3306

  db_subnet_group_name = aws_db_subnet_group.main.name
  vpc_security_group_ids = [
    aws_security_group.rds.id
  ]

  publicly_accessible = false

  multi_az = false

  deletion_protection = false

  skip_final_snapshot = true

  tags = merge(local.tags, {
    Name = "${local.name}-mysql"
  })
}
