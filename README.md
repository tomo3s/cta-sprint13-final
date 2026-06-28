# CloudTechホテル 口コミシステム 最終課題

## 課題概要

CloudTechホテルの口コミ投稿システムを、AWS上にTerraformで構築しました。  
フロントエンドは S3 + CloudFront、バックエンドAPIは ECS/Fargate、データベースは RDS MySQL を利用しています。

## 構成図

`docs/architecture.png` を参照

## Terraform実行方法

```bash
cd terraform
terraform init
terraform plan
terraform apply


利用サービス
VPC
Public Subnet / Private Subnet
Internet Gateway / NAT Gateway
Security Group
ALB
ECS / Fargate
ECR
RDS MySQL
S3
CloudFront
Route 53
ACM
CloudWatch Logs
CloudWatch Alarm

動作確認URL
フロントエンド
https://hotel.tmr-lab.net

API Health Check
https://api.hotel.tmr-lab.net/health

口コミ一覧API
https://api.hotel.tmr-lab.net/api/v1/reviews

実装した要件
要件1：CloudFront + S3 によるフロントエンド配信
要件2：ECS/Fargate によるバックエンドAPI実行
要件3：RDS MySQL による口コミデータ永続化
要件4：VPC、Subnet、Security Group によるネットワーク設計
要件5：ALB と ECS Service Auto Scaling による冗長化・スケーリング
要件6：Route 53 と ACM による独自ドメイン・HTTPS化
要件7：Terraform によるIaC構築
任意：CloudWatch Alarm によるECS CPU監視

補足
API起動時に reviews テーブルを自動作成するよう修正しています。
ECS CPU使用率が70%を超えた場合にCloudWatch Alarmを発報する構成としています。
