resource "aws_ssm_parameter" "db_password" {
  name        = "/${local.name}/db/password"
  description = "RDS password for ${local.name}"
  type        = "SecureString"
  value       = var.db_password

  tags = local.tags
}

resource "aws_iam_role_policy" "ecs_task_execution_ssm" {
  name = "${local.name}-ecs-task-execution-ssm"
  role = aws_iam_role.ecs_task_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ssm:GetParameter",
          "ssm:GetParameters"
        ]
        Resource = aws_ssm_parameter.db_password.arn
      }
    ]
  })
}