課題概要

構成図

Terraform実行方法

terraform init
terraform plan
terraform apply

利用サービス
- VPC
- ECS
- RDS
- S3
- CloudFront
- Route53
- CloudWatch監視
  ・ECS CPU使用率が70%を超えた場合にCloudWatch Alarmを発報するよう設定
  ・ECS Auto ScalingによりCPU使用率に応じてスケールイン・スケールアウトを実施

■フロント
https://hotel.tmr-lab.net

■API Health Check
https://api.hotel.tmr-lab.net/health

■口コミ一覧API
https://api.hotel.tmr-lab.net/api/v1/reviews
