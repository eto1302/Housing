package com.example.Housing;

import com.example.Housing.Entities.Address;
import com.example.Housing.Entities.Photo;
import com.example.Housing.Entities.Property;
import com.example.Housing.Repositories.AddressRepository;
import com.example.Housing.Repositories.PhotoRepository;
import com.example.Housing.Repositories.PropertyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

import static com.example.Housing.Controllers.PasswordController.generatePassword;

@SpringBootApplication
public class HousingApplication {

	private String loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus urna urna, mollis vitae posuere non, tempor nec risus. Etiam justo felis, sollicitudin eu viverra ultrices, porta sit amet nisi. Nunc feugiat erat vitae viverra posuere. Donec ullamcorper tortor non orci fermentum, non congue libero efficitur. In non tincidunt enim. Sed rhoncus nisl non odio gravida ullamcorper sit amet sit amet risus. Integer dictum nec ipsum id ultrices. Ut dictum sed quam eget ultricies.\n" +
			"\n" +
			"Aenean dignissim lobortis efficitur. Maecenas id auctor est. Ut id ante sed sem volutpat interdum. Proin mauris massa, dapibus sit amet blandit ut, pellentesque sed quam. Maecenas semper eleifend sem, eget feugiat erat tincidunt eget. Fusce rutrum bibendum massa, et commodo risus egestas eu. Aenean a pellentesque lectus. Integer luctus urna faucibus, hendrerit dolor quis, iaculis lacus. Curabitur pharetra purus orci, id rhoncus mauris sollicitudin sed. Suspendisse eros tortor, sagittis vel posuere eget, egestas ut neque.";

	public static void main(String[] args) {
		SpringApplication.run(HousingApplication.class, args);
	}

	@Bean
	CommandLineRunner init(PropertyRepository propertyRepository, PhotoRepository photoRepository, AddressRepository addressRepository) {
		return args -> {
			generatePassword();
			//populateDatabase(propertyRepository, photoRepository, addressRepository);
		};
	}


	private void populateDatabase(PropertyRepository propertyRepository, PhotoRepository photoRepository, AddressRepository addressRepository) {
		int begin = 0;
		int end = 0;
		for(int i = 0; i < 100; ++i){
			addressRepository.save(new Address("testStreet 25", "Varna", "Coast", "Bulgaria", "9000", 43.20230700815063, 27.92398286015827));
			for(int j = 0; j < 7; ++j){
				try{
					//TODO change jpg extension. Scan all files, get each individual extension and pass it to l.56
					File imageFile = new File("src/main/resources/image" + (j) + ".jpg");
					BufferedImage image = ImageIO.read(imageFile);

					// Convert the image to byte array
					ByteArrayOutputStream baos = new ByteArrayOutputStream();
					ImageIO.write(image, "jpg", baos);
					byte[] byteArray = baos.toByteArray();

					// Close the ByteArrayOutputStream
					baos.close();
					photoRepository.save(new Photo(byteArray));
					end++;
				}
				catch(IOException e){
					System.out.println(e.getMessage());
				}

			}
			var photos = photoRepository.findAll();
			if(!photos.isEmpty()){
				Property property = new Property("Силвия Гочева",
						"Test Housing, No_" + i, loremIpsum, addressRepository.findAll().get(i), 13.70,
						Date.from(LocalDate.of(2023, 6, 29).atStartOfDay(ZoneId.systemDefault()).toInstant()),
						4, "testLink", false, getPhotosBetween(photos, begin, end));
				propertyRepository.save(property);
				System.out.println("Property " + i + " printed!");
			}
			begin = end;
		}
		System.out.println("Data saved!");
	}

	private Set<Photo> getPhotosBetween(List<Photo> photos, int begin, int end) {
		HashSet<Photo> result = new HashSet<>();
		for(int i = begin; i < end; ++i){
			result.add(photos.get(i));
		}
		return result;
	}
}
