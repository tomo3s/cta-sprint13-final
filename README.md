# CloudTechホテル 口コミシステム 最終課題

## 課題概要
CloudTechホテルの口コミ投稿システムを、AWS上にTerraformで構築しました。
<br>
フロントエンドは S3 + CloudFront、バックエンドAPIは ECS/Fargate、データベースは RDS MySQL を利用しています。

## 構成図

`docs/architecture.png` を参照

## Terraform実行方法
cd terraform
<br>
terraform init
<br>
terraform plan
<br>
terraform apply
<br>
## 利用サービス
VPC
<br>
Public Subnet / Private Subnet
<br>
Internet Gateway / NAT Gateway
<br>
Security Group
<br>
ALB
<br>
ECS / Fargate
<br>
ECR
<br>
RDS MySQL
<br>
S3
<br>
CloudFront
<br>
Route 53
<br>
ACM
<br>
CloudWatch Logs
<br>
CloudWatch Alarm
<br>

## 動作確認URL

フロントエンド
https://hotel.tmr-lab.net
<br>
API Health Check
https://api.hotel.tmr-lab.net/health
<br>
口コミ一覧API
https://api.hotel.tmr-lab.net/api/v1/reviews
<br>
## 実装した要件
要件1：CloudFront + S3 によるフロントエンド配信
<br>
要件2：ECS/Fargate によるバックエンドAPI実行
<br>
要件3：RDS MySQL による口コミデータ永続化
<br>
要件4：VPC、Subnet、Security Group によるネットワーク設計
<br>
要件5：ALB と ECS Service Auto Scaling による冗長化・スケーリング
<br>
要件6：Route 53 と ACM による独自ドメイン・HTTPS化
<br>
要件7：Terraform によるIaC構築
<br>
任意：CloudWatch Alarm によるECS CPU監視
<br>

## 補足
API起動時に reviews テーブルを自動作成するよう修正しています。
<br>
ECS CPU使用率が70%を超えた場合にCloudWatch Alarmを発報する構成としています。
<br>
