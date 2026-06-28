resource "aws_cloudwatch_metric_alarm" "ecs_cpu_high" {

  alarm_name          = "${local.name}-ecs-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2

  metric_name = "CPUUtilization"
  namespace   = "AWS/ECS"

  period    = 300
  statistic = "Average"
  threshold = 70

  alarm_description = "Alarm when ECS CPU exceeds 70%"

  dimensions = {
    ClusterName = aws_ecs_cluster.main.name
    ServiceName = aws_ecs_service.api.name
  }

  treat_missing_data = "notBreaching"
  tags               = local.tags
}