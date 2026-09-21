# medsense-frontend

Presentation tier of MedSense: a small React (Vite) single-page app
with a search bar and medicine detail cards, calling the backend API
over HTTPS/JSON.

Sibling repos: [medsense-infra](../medsense-infra) (Terraform, S3 +
CloudFront hosting), [medsense-backend](../medsense-backend) (FastAPI
on Lambda).

## Local development

```bash
npm install
cp .env.example .env.local   # point VITE_API_BASE_URL at your dev API Gateway URL
npm run dev
```

## Tests

```bash
npm run lint
npm test
```

## CI/CD

- **`ci.yml`** - lint, test, and build on every PR/push to `main`.
- **`_deploy-reusable.yml`** - builds the SPA against an environment's
  API URL, `aws s3 sync`s the output to that environment's bucket, and
  invalidates the CloudFront distribution. Authenticated via GitHub
  OIDC - no long-lived AWS keys in the repo.
- **`deploy-dev.yml`** - runs automatically on push to `main`.
- **`deploy-staging.yml` / `deploy-prod.yml`** - same job, manually
  triggered (`workflow_dispatch`); wire these up once those AWS
  accounts exist. Add required reviewers on the `prod` GitHub
  Environment to gate it behind approval.

Each environment (`dev` / `staging` / `prod`) is a separate
[GitHub Environment](../../settings/environments) with its own
secrets, populated from the matching `medsense-infra` Terraform
outputs:

| Repo secret                    | Terraform output              |
|----------------------------------|---------------------------------|
| `AWS_DEPLOY_ROLE_ARN`            | `frontend_deploy_role_arn`      |
| `S3_BUCKET_NAME`                 | `frontend_bucket_name`          |
| `CLOUDFRONT_DISTRIBUTION_ID`     | `frontend_distribution_id`      |
| `VITE_API_BASE_URL`              | `api_endpoint`                  |

Terraform itself creates the OIDC-federated `AWS_DEPLOY_ROLE_ARN` role
(see `medsense-infra/modules/github_oidc`), scoped to only
`s3:PutObject/GetObject/ListBucket/DeleteObject` on this one bucket
and `cloudfront:CreateInvalidation` - this repo's CI can never touch
anything else in the AWS account.
