**Ansible configuration commands**: <br>

**ansible-playbook ansible/playbooks/deploy_gke.yml -e "full_image=[IMAGE]" -e "deployment_name=dogood" -e "container_name=dogood"** to apply Kubernetes manifests, update image, and wait for rollout.

**ansible-playbook ansible/playbooks/update_gitops_tag.yml -e "gitops_file=[PATH_TO_KUSTOMIZATION]" -e "image_tag=[TAG]"** to update GitOps image tag configuration.
