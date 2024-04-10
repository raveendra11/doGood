package in.charity.dogood.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import in.charity.dogood.model.Donor;

public interface DonorRepository extends JpaRepository<Donor, Long> {
}
