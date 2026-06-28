resource "aws_ecr_repository" "api" {

  name = "${local.name}-api"

  image_tag_mutability = "MUTABLE"

  force_delete = true

  image_scanning_configuration {

    scan_on_push = true

  }

  tags = merge(local.tags, {

    Name = "${local.name}-api"

  })

}